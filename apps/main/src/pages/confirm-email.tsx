import { zodAdapter } from '@nx-manager-app/shared-utils';
import { Button, PinInput } from '@nx-manager-app/ui';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Wrapper from '../components/Wrapper/Wrapper';
import { useConfirmEmailMutation, useSendConfirmationMutation } from '../generated/graphql';
import { useUserData } from '../hooks/useUserData';
import { confirmEmailSchema } from '../schema/confirmEmail';
import { getUrqlClientConfig } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import { withAuth } from '../utils/withAuth';

const ConfirmEmail: NextPage = () => {
  const { user } = useUserData();
  const [confirmationToken, setConfirmationToken] = useState<string>();
  const [{ fetching: sendingConfirmation }, sendConfirmation] = useSendConfirmationMutation();
  const [{ fetching }, confirmEmail] = useConfirmEmailMutation();
  const router = useRouter();

  if (!user) {
    return;
  }

  useEffect(() => {
    if (user.emailConfirmed) {
      toast.error('Your email is already confirmed');

      return;
    }

    sendConfirmation().then((response) => {
      if (response.error) {
        toast.error(response.error.graphQLErrors[0].message);

        return;
      }

      const token = response.data?.sendConfirmation;

      if (!token) {
        return;
      }

      setConfirmationToken(token);
    });
  }, []);

  return (
    <Wrapper
      className='w-[20rem] flex flex-col gap-2'
    >
      <div>
        We {sendingConfirmation ? 'are sending' : 'have sent'} an email to&nbsp;
        <span
          className='font-semibold'
        >
          {user.email}!
        </span>
      </div>
      <Formik
        initialValues={{
          code: []
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);

          const response = await confirmEmail({
            options: {
              code: values.code.join(''),
              token: confirmationToken
            }
          });

          if (response.data) {
            if (response.data.confirmEmail) {
              toast.success('Email confirmed successfully!');

              router.push('/');
            } else {
              toast.error('Wasn\'t able to confirm your email');
            }
          }

          if (response.error) {
            setErrors(toErrorMap(response.error.graphQLErrors));
          }

          setSubmitting(false);
        }}
        validate={zodAdapter(confirmEmailSchema)}
      >
        <Form
          className='flex flex-col gap-4 item'
        >
          <PinInput
            required
            label='Confirmation code'
            name='code'
            numbersCount={6}
          />
          <Button
            className='w-28'
            colorScheme='primary'
            type='submit'
            isLoading={fetching}
          >
            Confirm
          </Button>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(
  getUrqlClientConfig,
  { ssr: true }
)(withAuth(ConfirmEmail));
