import classnames from 'classnames';
import { capitalize, last } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

export interface ItemProps {
  name: string
};

const Item = ({
  name,
  children
}: PropsWithChildren<ItemProps>) => {
  const { pathname } = useRouter();
  const selected = last(pathname.split('/')) === name || (name === 'account' && last(pathname.split('/')) === 'settings');

  return (
    <Link
      href={`/settings/${name}`}
    >
      <li
        className={classnames(
          'relative flex gap-2 items-center cursor-pointer text-sm hover:bg-gray-200 rounded-md p-1',
          {
            'before:bg-primary before:h-5 before:w-1 before:absolute before:-left-2 before:rounded-full bg-gray-200': selected
          }
        )}
      >
        {children}
        <div>{capitalize(name)}</div>
      </li>
    </Link>
  );
};

export default Item;
