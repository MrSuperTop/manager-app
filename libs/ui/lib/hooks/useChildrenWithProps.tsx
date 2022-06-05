import { Children, cloneElement, isValidElement, ReactNode } from 'react';

const useChildrenWithProps = <T extends object>(
  children: ReactNode,
  props: Partial<T> | Partial<T>[]
) => {
  return Children.map<ReactNode, ReactNode>(
    children,
    (child, index) => {
      if (isValidElement(child)) {
        if (Array.isArray(props)) {
          return cloneElement(child, props[index]);
        }
        else {
          return cloneElement(child, props);
        }
      }

      return child;
    }
  );
};

export default useChildrenWithProps;
