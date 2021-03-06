import { getObjecKeysAsTuple } from '@nx-manager-app/shared-utils';
import classnames from 'classnames';
import { MouseEventHandler } from 'react';
import { IconType } from '../../../types/Icon';
import Loader from '../../Loader/Loader';
import { ButtonProps, defaultButtonClasses, styleClasses } from '../Button/Button';
import { useButtonGroupState } from '../Button/Group/store';

type NeededButonProps = Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'loaderPlacement' | 'loadingText'>;

export const sizeClasses = {
  sm: {
    button: 'p-1',
    icon: 'h-4 w-4'
  },
  md: {
    button: 'p-2',
    icon: 'h-5 w-5'
  },
  lg: {
    button: 'p-2',
    icon: 'h-6 w-6'
  }
};

export const sizes = getObjecKeysAsTuple(sizeClasses);

export interface IconButtonProps extends NeededButonProps {
  icon: IconType
}

const IconButton = (
  {
    variant,
    colorScheme,
    size = 'md',
    type = 'button',
    disabled,
    isLoading,
    icon,
    onClick,
    className
  }: IconButtonProps
) => {
  const sharedProps = useButtonGroupState();
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    if (!onClick || isLoading) return;

    onClick(event);
  };

  colorScheme = colorScheme || sharedProps?.colorScheme || 'primary';
  variant = variant || sharedProps?.variant || 'default';

  const currentStyleClasses = styleClasses[variant][colorScheme];
  let content = (
    <div
      className={sizeClasses[size]['icon']}
    >
      {icon}
    </div>
  );

  if (isLoading) {
    content = (
      <Loader
        className={classnames(
          currentStyleClasses['loader']
        )}
      />
    );
  }

  return (
    <button
      onClick={clickHandler}
      disabled={isLoading || disabled}
      type={type}
      className={classnames(
        defaultButtonClasses,
        sizeClasses[size]['button'],
        currentStyleClasses['main'],
        styleClasses['shared'][colorScheme]['main'],
        { [`cursor-not-allowed p-2 ${currentStyleClasses['loading']}`]: isLoading },
        className
      )}
    >
      {content}
    </button>
  );
};

export default IconButton;
