import { CogIcon, LogoutIcon } from '@heroicons/react/outline';
import { Menu } from '@nx-manager-app/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';
import { useLogoutMutation } from '../../../generated/graphql';
import { useUserData } from '../../../hooks/useUserData';
import UserAvatar from '../../UserAvatar/UserAvatar';

export const LoggedIn = () => {
  const logout = useLogoutMutation()[1];
  const { user } = useUserData();
  const router = useRouter();

  const logoutHandler: MouseEventHandler<HTMLDivElement> = async () => {
    await logout();

    router.push('/');
  };

  if (!user) {
    return;
  }

  return (
    <>
      <Menu
        position='right'
        className='w-56 text-black'
        controller={
          <div>
            <UserAvatar
              className='bg-white cursor-pointer'
            />
          </div>
        }
      >
        <div
          className='p-3 text-sm'
        >
          <span>Signed in as</span>
          &nbsp;
          <span
            className='font-bold'
          >
            {user.username}
          </span>
        </div>
        <div className="p-1">
          <Link
            href='/settings'
          >
            <Menu.Option
              className='flex items-center gap-2'
            >
              <CogIcon
                className='h-5 w-5 '
              />
              <div>Settings</div>
            </Menu.Option>
          </Link>
          <Menu.Option
            onClick={logoutHandler}
            className='flex items-center gap-2'
          >
            <LogoutIcon
              className='h-5 w-5 text-red-500'
            />
            <div>Logout</div>
          </Menu.Option>
        </div>
      </Menu>
    </>
  );
};
