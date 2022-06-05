import classnames from 'classnames';
import { capitalize } from 'lodash-es';
import React, { MouseEventHandler, ReactNode, RefObject, useEffect, useRef } from 'react';

export interface InnerProps {
  className?: string,
  noPointerEvents?: boolean,
  width?: number,
  parentRef?: RefObject<HTMLElement>,
  onClick?: MouseEventHandler<HTMLDivElement>,
  children: ReactNode
};

export const innerSides = ['left', 'right'] as const;

const withInner = (
  side: typeof innerSides[number],
  customStyles?: string
): React.FC<InnerProps> => {
  const InnerComponent = (
    {
      noPointerEvents = false,
      className,
      parentRef,
      onClick,
      children
    }: InnerProps
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!parentRef || !parentRef.current || !containerRef || !containerRef.current) return;

      const styleKey: 'paddingLeft' | 'paddingRight' = `padding${capitalize(side) as 'Right' | 'Left'}`;

      const parsedValue = parseInt(parentRef.current.style[styleKey]);
      const prevValue = Number.isNaN(parsedValue) ? 0 : parsedValue;
      const newValue = prevValue + containerRef.current.clientWidth + 8;

      parentRef.current.style[styleKey] = `${newValue}px`;
    }, [parentRef]);

    return (
      <div
        ref={containerRef}
        onClick={onClick}
        className={classnames(
          customStyles,
          'flex absolute items-center text-gray-500',
          { 'pl-3 left-0': side === 'left' },
          { 'pr-3 right-0': side === 'right' },
          { 'pointer-events-none': noPointerEvents },
          className
        )}
      >
        {children}
      </div>
    );
  };

  InnerComponent.displayName = `Inner${capitalize(side)}`;

  return InnerComponent;
};

export default withInner;
