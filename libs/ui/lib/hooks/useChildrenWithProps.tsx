import { Children, cloneElement, isValidElement, ReactNode } from 'react';

const useChildrenWithProps = <T extends object>(
  children: ReactNode,
  props: Partial<T>
) => {
  return Children.map<ReactNode, ReactNode>(
    children,
    (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, props);
      }

      return child;
    }
  );
};

export default useChildrenWithProps;
