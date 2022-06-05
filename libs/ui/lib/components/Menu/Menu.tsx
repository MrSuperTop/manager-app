import { Menu as HeadlessMenu } from '@headlessui/react';
import classnames from 'classnames';
import { Fragment, PropsWithChildren, ReactNode } from 'react';
import Float from '../Float/Float';
import Option from './Option';

export const positions = ['left', 'right'] as const;

export interface MenuProps {
  controller: ReactNode,
  className: string,
  position?: typeof positions[number]
};

const Menu = ({
  children,
  controller,
  className,
  position = 'left'
}: PropsWithChildren<MenuProps>) => {
  return (
    <HeadlessMenu
      as='div'
      className='relative inline-block'
    >
      {({ open }) => (
        <>
          <HeadlessMenu.Button
            as={Fragment}
          >
            {controller}
          </HeadlessMenu.Button>
          <Float
            open={open}
            className={classnames(
              'focus:outline-none absolute mt-2 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5',
              {
                'left-0': position === 'left',
                'right-0': position === 'right'
              },
              className
            )}
          >
            <HeadlessMenu.Items
              static
              className="flex flex-col focus:outline-none divide-y divide-gray-200"
            >
              {children}
            </HeadlessMenu.Items>
          </Float>
        </>
      )}
    </HeadlessMenu>
  );
};

export default Object.assign(Menu, {
  Option
});
