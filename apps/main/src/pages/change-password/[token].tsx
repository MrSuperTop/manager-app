import { zodAdapter } from '@nx-manager-app/shared-utils';
import { Button, PasswordField } from '@nx-manager-app/ui';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { z } from 'zod';
import Wrapper from '../../components/Wrapper/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { changePasswordSchema } from '../../schema/changePassword';
import { getUrqlClientConfig } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [{ fetching }, changePassword] = useChangePasswordMutation();

  return (
    <Wrapper>
      <Formik<Required<z.infer<typeof changePasswordSchema>>>
        initialValues={{
          newPassword: ''
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);

          let token = router.query.token;
          token = typeof token === 'string' ? token : '';

          const response = await changePassword({
            options: {
              ...values,
              token
            }
          });

          if (response.data) {
            router.push('/login');
          } else {
            setErrors(toErrorMap(response.error.graphQLErrors));
          }

          setSubmitting(false);
        }}
        validate={zodAdapter(changePasswordSchema)}
      >
        <Form
          className='w-full flex flex-col gap-4'
        >
          <div
            className='flex flex-col gap-2'
          >
            <PasswordField
              name='newPassword'
              placeholder='new password'
            />
          </div>
          <Button
            colorScheme='primary'
            type='submit'
            isLoading={fetching}
          >
            Change Password
          </Button>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(
  getUrqlClientConfig,
  { ssr: true }
)(ChangePassword);
