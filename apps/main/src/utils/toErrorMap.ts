import { GraphQLError } from 'graphql';

export const toErrorMap = (
  errors: GraphQLError[]
): Record<string, string> => {
  const map: Record<string, string> = {};

  for (const error of errors) {
    if (!error.extensions || !error.extensions.fields) {
      continue;
    }

    for (const field of error.extensions.fields) {
      map[field] = error.message;
    }
  }

  return map;
};
