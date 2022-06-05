import { AtSymbolIcon, UserIcon, LockClosedIcon } from '@heroicons/react/outline';
import { zodAdapter } from '@nx-manager-app/shared-utils';
import { Button, PasswordField, TextField } from '@nx-manager-app/ui';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { z } from 'zod';
import Wrapper from '../components/Wrapper/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { registerSchema } from '../schema/register';
import { getUrqlClientConfig } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import toast from 'react-hot-toast';

export function Register() {
  const router = useRouter();
  const [{ fetching }, register] = useRegisterMutation();

  return (
    <Wrapper>
      <Formik<Required<z.infer<typeof registerSchema>>>
        initialValues={{
          username: '',
          password: '',
          email: ''
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);

          const response = await register({
            options: values
          });

          if (response.data) {
            router.push('/confirm-email');
          } else {
            const error = response.error.graphQLErrors[0];

            if (error.extensions?.code === 'ALREADY_LOGGED_IN') {
              toast.error(error.message);
            }

            setErrors(toErrorMap(response.error.graphQLErrors));
          }

          setSubmitting(false);
        }}
        validate={zodAdapter(registerSchema)}
      >
        <Form
          className='w-full flex flex-col gap-4'
        >
          <div
            className='flex flex-col gap-2'
          >
            <TextField
              placeholder='username'
              name='username'
            >
              <TextField.InnerLeft>
                <UserIcon
                  className='h-5 w-5'
                />
              </TextField.InnerLeft>
            </TextField>
            <TextField
              name='email'
              type='email'
              placeholder='email@example.com'
            >
              <TextField.InnerLeft>
                <AtSymbolIcon
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
          </div>
          <Button
            colorScheme='primary'
            type='submit'
            isLoading={fetching}
          >
            Register
          </Button>
        </Form>
      </Formik>
      <p
        className='mt-2'
      >
        Already have an account?&nbsp;
        <span
          className='text-primary'
        >
          <Link
            href='/login'

          >Login!</Link>
        </span>
      </p>
    </Wrapper>
  );
}

export default withUrqlClient(
  getUrqlClientConfig,
  { ssr: true }
)(Register);
