import { ComponentPropsWithoutRef } from 'react';

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  htmlFor?: string
};

const Label: React.FC<LabelProps> = ({
  htmlFor,
  className,
  children,
  ...props
}) => {
  if (!children) return null;

  return (
    <label
      htmlFor={htmlFor}
      className={className ? className : 'text-base mb-1 dark:text-white text-gray-900'}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
