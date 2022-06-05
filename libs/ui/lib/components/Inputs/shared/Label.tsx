import { ComponentPropsWithoutRef } from 'react';

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  htmlFor?: string,
  required?: boolean
};

const Label = (
  {
    required = false,
    htmlFor,
    className,
    children,
    ...props
  }: LabelProps
) => {
  if (!children) return null;

  return (
    <label
      htmlFor={htmlFor}
      className={className ? className : 'text-base mb-1 dark:text-white text-gray-900'}
      {...props}
    >
      {children}
      {required && (
        <span
          className='text-red-600 text-xs'
        >
          &nbsp;*
        </span>
      )}
    </label>
  );
};

export default Label;
