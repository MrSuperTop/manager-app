import { ReactNode } from 'react';
import { animated, config, useTransition } from 'react-spring';

interface FloatProps {
  open: boolean,
  className?: string,
  children: ReactNode
}

const Float = (
  {
    open,
    className,
    children
  }: FloatProps
) => {
  const position = {
    x: 0,
    y: 0
  };

  const shiftedPosition = {
    x: 0,
    y: 25
  };

  const transition = useTransition(open, {
    config: config.stiff,
    from: {
      opacity: 0,
      ...shiftedPosition
    },
    enter: {
      opacity: 1,
      ...position
    },
    leave: {
      opacity: 0,
      ...shiftedPosition
    }
  });

  return (
    <>
      {transition((style, childVisible) => {
        return childVisible ? (
          <animated.div
            className={className}
            style={style}
          >
            {children}
          </animated.div>
        ) : null;
      })} 
    </>
  );
};

export default Float;
