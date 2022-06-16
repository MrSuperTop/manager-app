import Link from 'next/link';

export const NotLoggedIn = () => {
  return (
    <div
      className='flex items-center gap-4'
    >
      <Link
        href='/login'
      >
        Login
      </Link>
      <Link
        href='/register'
      >
        <a
          className='py-1.5 px-3 bg-white text-gray-800 transition hover:ring-black hover:ring-2 border-white rounded-md'
        >
          Register
        </a>
      </Link>
    </div>
  );
};
