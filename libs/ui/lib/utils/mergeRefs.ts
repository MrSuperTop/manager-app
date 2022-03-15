import { ForwardedRef } from 'react';

export const mergeRefs = <T extends HTMLElement>(
  ...refs: (ForwardedRef<T>)[]
) => {
  const filteredRefs = refs.filter(Boolean);

  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];

  return (instance: T) => {
    for (const ref of filteredRefs) {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref) {
        ref.current = instance;
      }
    }
  };
};