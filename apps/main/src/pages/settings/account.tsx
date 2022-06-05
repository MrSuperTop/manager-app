import { Button } from '@nx-manager-app/ui';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { SettingsLayout } from '../../components/layout/Settings/SettingsLayout';
import { useClearDataMutation } from '../../generated/graphql';
import { getUrqlClientConfig } from '../../utils/createUrqlClient';
import { withAuth } from '../../utils/withAuth';

const Account: NextPage = () => {
  const [{ fetching }, clearData] = useClearDataMutation();
  const router = useRouter();

  const handleClearData = async () => {
    router.push('/');
    await clearData();
  };

  return (
    <SettingsLayout
      className='w-full flex gap-2 flex-col items-start'
    >
      <div
        className='text-xl text-red-500 pb-1 border-b border-gray-200 w-full'
      >
        Delete Account
      </div>
      <div>This action can not be reverted</div>
      <Button
        className='block'
        colorScheme='secondary'
        isLoading={fetching}
        onClick={handleClearData}
      >
        Delete
      </Button>
    </SettingsLayout>
  );
};

export default withUrqlClient(
  getUrqlClientConfig,
  { ssr: true }
)(withAuth(Account));
