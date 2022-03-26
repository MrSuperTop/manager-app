import { UnionToTuple } from './unionToTuple';

export const getObjecKeysAsTuple = <T extends Record<symbol, string>>(
  object: T
) => {
  return Object.keys(object) as UnionToTuple<keyof typeof object>;
};
