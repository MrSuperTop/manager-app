import classnames from 'classnames';
import Image from 'next/image';
import { forwardRef } from 'react';
import { useUserData } from '../../hooks/useUserData';

const cyrb53 = function(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
  h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1>>>0);
};

export const sizes = ['small', 'big'] as const;

export interface UserAvatarProps {
  className?: string,
  size?: typeof sizes[number]
};

const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>((
  {
    className,
    size = 'small'
  },
  ref
) => {
  const { user } = useUserData();

  if (!user) {
    return;
  }

  return (
    <div
      ref={ref}
      className={classnames(
        'rounded-full select-none',
        {
          'p-2 h-10 w-10': size === 'small',
          'p-3 h-14 w-14': size === 'big'
        },
        className
      )}
    >
      <Image
        layout='responsive'
        height={20}
        width={20}
        alt='user avalar'
        src={`https://avatars.dicebear.com/api/identicon/${cyrb53(user.username)}.svg`}
        className='h-5 w-5 text-red-500'
      />
    </div>
  );
});

UserAvatar.displayName = 'UserAvatar';

export default UserAvatar;
