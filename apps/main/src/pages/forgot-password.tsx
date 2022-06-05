import { AtSymbolIcon } from '@heroicons/react/outline';
import { zodAdapter } from '@nx-manager-app/shared-utils';
import { Button, TextField } from '@nx-manager-app/ui';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import toast from 'react-hot-toast';
import { z } from 'zod';
import Wrapper from '../components/Wrapper/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { forgotPasswordSchema } from '../schema/forgotPassword';
import { getUrqlClientConfig } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

const FAIL_MESSAGE = 'Wasn\'t able to send an email';

export function ForgotPassword() {
  const [{ fetching }, forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper>
      <Formik<Required<z.infer<typeof forgotPasswordSchema>>>
        initialValues={{
          email: ''
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);

          const response = await toast.promise(
            forgotPassword(values),
            {
              loading: 'Sending an email...',
              success: 'Email sent! See your inbox',
              error: FAIL_MESSAGE
            }
          );

          if (response.error) {
            toast.error(FAIL_MESSAGE);

            setErrors(toErrorMap(response.error.graphQLErrors));
          }

          setSubmitting(false);
        }}
        validate={zodAdapter(forgotPasswordSchema)}
      >
        <Form
          className='flex flex-col gap-4'
        >
          <div
            className='flex flex-col'
          >
            <TextField
              placeholder='email'
              name='email'
            >
              <TextField.InnerLeft>
                <AtSymbolIcon
                  className='h-5 w-5'
                />
              </TextField.InnerLeft>
            </TextField>
          </div>
          <Button
            isLoading={fetching}
            colorScheme='primary'
            type='submit'
          >
            Send Email
          </Button>
        </Form>
      </Formik>
    </Wrapper>
  );
}

export default withUrqlClient(
  getUrqlClientConfig,
  { ssr: true }
)(ForgotPassword);
