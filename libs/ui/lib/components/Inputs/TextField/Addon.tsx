import classnames from 'classnames';
import { PropsWithChildren } from 'react';
import { inputGroupItemClasses } from '../InputGroup/InputGroup';

export interface AddonProps {
  className?: string
};

const Addon = (
  {
    className,
    children
  }: PropsWithChildren<AddonProps>
) => {
  return (
    <div
    className={classnames(
      'inline-flex items-center px-3 text-base text-gray-900 bg-gray-200 whitespace-nowrap wrounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 group-item:first:rounded-l-md group-item:first:border-l group-item:last:rounded-r-md group-item:last:border-r',
      inputGroupItemClasses,
      className
    )}
    >
      {children}
    </div>
  );
};

export default Addon;
