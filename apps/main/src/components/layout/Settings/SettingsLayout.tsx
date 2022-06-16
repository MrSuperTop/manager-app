import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { useUserData } from '../../../hooks/useUserData';
import SideBar from '../../SideBar/SideBar';
import UserAvatar from '../../UserAvatar/UserAvatar';
import Layout from '../Layout/Layout';

export type SettingsLayoutProps = ComponentPropsWithoutRef<'div'>;

export const SettingsLayout = ({
  children,
  ...props
}: PropsWithChildren<SettingsLayoutProps>) => {
  const { user } = useUserData();

  if (!user) {
    return;
  }

  return (
    <Layout
      variant='normal'
      className='gap-4'
    >
      <div
        className='flex gap-2 items-center'
      >
        <UserAvatar
          size='big'
          className='bg-white border-gray-200 border'
        />
        <div
          className='font-bold text-lg'
        >
          {user.username}
        </div>
      </div>
      <div
        className='flex gap-10'
      >
        <SideBar />
        <div
          className='grow'
          {...props}
        >
          {children}
        </div>
      </div>
    </Layout>
  );
};
