import Link from 'next/link';
import { useUserData } from '../../hooks/useUserData';
import { LoggedIn } from './LoggedIn/LoggedIn';
import { NotLoggedIn } from './NotLoggedIn/NotLoggedIn';

const NavBar = () => {
  const { user } = useUserData();

  return (
    <div
      className='w-full bg-primary-700 text-white h-16 flex items-center px-4 justify-center'
    >
      <div
        className='flex justify-between items-center w-3/5'
      >
        <Link
          href='/'
        >
          <a
            className='text-xl'
          >
            Words
          </a>
        </Link>
        {user ? (
          <LoggedIn />
        ) : (
          <NotLoggedIn />
        )}
      </div>
    </div>
  );
};

export default NavBar;
