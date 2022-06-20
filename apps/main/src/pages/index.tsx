import { Loader } from '@nx-manager-app/ui';
import { withUrqlClient } from 'next-urql';
import Layout from '../components/layout/Layout/Layout';
import { useUserData } from '../hooks/useUserData';
import { getUrqlClientConfig } from '../utils/createUrqlClient';

export function Index() {
  const { user, isLoggedIn, fetching } = useUserData();

  if (fetching) {
    return (
      <div
        className='w-full h-screen flex-center items-center gap-2'
      >
        Waiting for response...
        <Loader />
      </div>
    );
  }

  return (
    <Layout
      variant='normal'
    >
      <div
        className='break-words'
      >
        {JSON.stringify({
          user,
          isLoggedIn
        })}
      </div>
    </Layout>
  );
}

export default withUrqlClient(
  getUrqlClientConfig,
  { ssr: true }
)(Index);
