import { UserCircleIcon } from '@heroicons/react/outline';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import Item from './Item/Item';

export type SideBarProps = ComponentPropsWithoutRef<'ul'>;

const SideBar = ({
  ...props
}: PropsWithChildren<SideBarProps>) => {
  return (
    <ul
      className='w-48'
      {...props}
    >
      <Item
        name='account'
      >
        <UserCircleIcon
          className='h-5 w-5'
        />
      </Item>
    </ul>
  );
};

export default SideBar;
