import { betterUpdateQuery } from '../betterUpdateQuery';
import { RegisterMutation, MeQuery, MeDocument } from '../../generated/graphql';
import { UpdateResolver } from '@urql/exchange-graphcache';

export const registerUpdate: UpdateResolver = (
  _result,
  _,
  cache
) => {
  betterUpdateQuery<RegisterMutation, MeQuery>(
    cache,
    { query: MeDocument },
    _result,
    (result, query) => {
      if (_result.errors) {
        return query;
      } else {
        return {
          me: result.register
        };
      }
    }
  );
};
