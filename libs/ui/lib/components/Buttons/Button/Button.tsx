import classNames from 'classnames';
import { omit } from 'lodash-es';
import { ComponentPropsWithoutRef, forwardRef, MouseEventHandler } from 'react';
import { IconType } from '../../../types/Icon';
import { getObjecKeysAsTuple } from '@nx-manager-app/shared-utils';
import Loader from '../../Loader/Loader';
import Group from './Group/Group';
import { useButtonGroupState } from './Group/state/ButtonGroupContext';

export const defaultButtonClasses = 'inline-flex items-center rounded-lg focus:outline-none focus:ring focus:ring-opacity-50 transition cursor-pointer focus:ring-offset-2 flex items-center justify-center group-item:first:rounded-l-lg group-item:last:rounded-r-lg group-item:rounded-none';

const outlindeGroupStyles = 'group-item:border-r-0 group-item:last:border-r';

export const styleClasses = {
  default: {
    primary: {
      main: 'bg-primary text-white hover:bg-primary-darker focus:ring-primary',
      loading: 'bg-primary-loading hover:bg-primary-loading',
      loader: 'text-white'
    },
    secondary: {
      main: 'bg-secondary text-gray-800 hover:bg-secondary-darker',
      loading: 'bg-secondary-loading hover:bg-secondary-loading text-gray-500',
      loader: 'text-gray-500'
    }
  },
  outline: {
    primary: {
      main: `bg-white text-gray-900 hover:bg-gray-100 border border-gray-200 ${outlindeGroupStyles}`,
      loading: 'bg-white hover:bg-white text-gray-500',
      loader: 'text-gray-500'
    },
    secondary: {
      main: `bg-white text-gray-900 hover:bg-gray-100 border border-gray-200 ${outlindeGroupStyles}`,
      loading: 'bg-white hover:bg-white text-gray-500',
      loader: 'text-gray-500'
    }
  },
  shared: {
    primary: {
      main: 'focus:ring-primary',
      loading: '',
      loader: ''
    },
    secondary: {
      main: 'focus:ring-secondary',
      loading: '',
      loader: ''
    }
  }
};


export const sizeClasses = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-1.5 text-base',
  lg: 'px-4 py-2 text-lg'
};

export const sizes = getObjecKeysAsTuple(sizeClasses);
export const variants = getObjecKeysAsTuple(omit(styleClasses, 'shared'));
export const colorSchemes = getObjecKeysAsTuple(styleClasses.default);
export const loaderPlacements = ['left', 'right'] as const;

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: typeof variants[number],
  colorScheme?: typeof colorSchemes[number],
  size?: typeof sizes[number],
  loaderPlacement?: typeof loaderPlacements[number],
  leftIcon?: IconType,
  rightIcon?: IconType,
  isLoading?: boolean,
  loadingText?: string
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant,
  size = 'md',
  colorScheme,
  loaderPlacement = 'left',
  type = 'button',
  leftIcon,
  rightIcon,
  isLoading,
  loadingText,
  onClick,
  className,
  children
}, ref) => {
  const { sharedProps } = useButtonGroupState();
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    if (!onClick || isLoading) return;

    onClick(event);
  };

  colorScheme = colorScheme || sharedProps.colorScheme;
  variant = variant || sharedProps.variant;

  const currentStyleClasses = styleClasses[variant][colorScheme];
  let content = <>
    {leftIcon && (
      <div
        className='w-5 h-5 mr-2'
      >
        {leftIcon}
      </div>
    )}
    <span className='align-middle'>
      {children}
    </span>
    {rightIcon && (
      <div
        className='w-5 h-5 ml-2'
      >
        {rightIcon}
      </div>
    )}
  </>;

  if (isLoading && loadingText) {
    content = <>
      {loaderPlacement === 'left' && (
        <Loader
          className={classNames(
            'mr-2',
            currentStyleClasses['loader']
          )}
        />
      )}
      {loadingText}
      {loaderPlacement === 'right' && (
        <Loader
          className={classNames(
            'ml-2',
            currentStyleClasses['loader']
          )}
        />
      )}
    </>;
  } else if (isLoading) {
    content = (
      <Loader
        className={currentStyleClasses['loader']}
      />
    );
  }

  return (
    <button
      onClick={clickHandler}
      ref={ref}
      type={type}
      disabled={isLoading}
      className={classNames(
        defaultButtonClasses,
        sizeClasses[size],
        currentStyleClasses['main'],
        styleClasses['shared'][colorScheme]['main'],
        { [`cursor-not-allowed ${currentStyleClasses['loading']}`]: isLoading },
        { 'px-8': isLoading && !loadingText },
        className
      )}
    >
      {content}
    </button>
  );
});

export default Object.assign(Button, {
  Group
});
