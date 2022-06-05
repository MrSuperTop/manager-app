import { LockClosedIcon, UserIcon } from '@heroicons/react/outline';
import { zodAdapter } from '@nx-manager-app/shared-utils';
import { Button, PasswordField, TextField } from '@nx-manager-app/ui';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { z } from 'zod';
import Wrapper from '../components/Wrapper/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { loginSchema } from '../schema/login';
import { getUrqlClientConfig } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

export function Login() {
  const router = useRouter();
  const [{ fetching }, login] = useLoginMutation();

  return (
    <Wrapper>
      <Formik<Required<z.infer<typeof loginSchema>>>
        initialValues={{
          usernameOrEmail: '',
          password: ''
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);

          const response = await login({
            options: values
          });

          if (response.data) {
            router.push('/');
          } else {
            const error = response.error.graphQLErrors[0];

            if (error.extensions?.code === 'ALREADY_LOGGED_IN') {
              toast.error(error.message);
            }

            setErrors(toErrorMap(response.error.graphQLErrors));
          }

          setSubmitting(false);
        }}
        validate={zodAdapter(loginSchema)}
      >
        <Form
          className='w-full flex flex-col gap-4'
        >
          <div
            className='flex flex-col gap-2'
          >
            <TextField
              placeholder='username or email'
              name='usernameOrEmail'
            >
              <TextField.InnerLeft>
                <UserIcon
                  className='h-5 w-5'
                />
              </TextField.InnerLeft>
            </TextField>
            <PasswordField
              name='password'
              placeholder='password'
            >
              <PasswordField.InnerLeft>
                <LockClosedIcon
                  className='h-5 w-5'
                />
              </PasswordField.InnerLeft>
            </PasswordField>
            <Link
              href='/forgot-password'
            >
              <a
                className="text-primary text-sm"
              >
                Forgot password?
              </a>
            </Link>
          </div>
          <Button
            isLoading={fetching}
            colorScheme='primary'
            type='submit'
          >
            Login
          </Button>
        </Form>
      </Formik>
      <p
        className='mt-2'
      >
        Don&apos;t have an account?&nbsp;
        <span
          className='text-primary'
        >
          <Link
            href='/register'
          >Register!</Link>
        </span>
      </p>
    </Wrapper>
  );
}

export default withUrqlClient(
  getUrqlClientConfig,
  { ssr: true }
)(Login);
