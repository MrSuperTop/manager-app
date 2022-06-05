import classnames from 'classnames';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

export type Variants = 'small' | 'normal';
export interface WrapperProps extends ComponentPropsWithoutRef<'div'> {
  variant?: Variants;
};

const Wrapper = (
  {
    className,
    variant = 'small',
    ...props
  }: PropsWithChildren<WrapperProps>
) => {
  return (
    <div
      className={classnames(
        className,
        'h-full mx-auto flex flex-col',
        {
          'w-96 justify-center': variant === 'small',
          'w-full md:w-2/3 lg:w-3/5 p-4 md:p-0 md:py-4': variant === 'normal'
        }
      )}
      {...props}
    ></div>
  );
};

export default Wrapper;
