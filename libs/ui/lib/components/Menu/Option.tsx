import { Menu as HeadlessMenu } from '@headlessui/react';
import classnames from 'classnames';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

export type OptionProps = ComponentPropsWithoutRef<'div'>;

const Option = ({
  children,
  className,
  ...props
}: PropsWithChildren<OptionProps>) => {
  return (
    <HeadlessMenu.Item>
      {({ active }) => (
        <div
          {...props}
          className={classnames(
            'focus:outline-none w-full transition-none rounded-md p-2 cursor-pointer select-none',
            className,
            { 'bg-neutral-100': active }
          )}
        >
          {children}
        </div>
      )}
    </HeadlessMenu.Item>
  );
};

export default Option;
