import { betterUpdateQuery } from '../betterUpdateQuery';
import { LoginMutation, MeQuery, MeDocument } from '../../generated/graphql';
import { UpdateResolver } from '@urql/exchange-graphcache';

export const loginUpdate: UpdateResolver = (
  _result,
  _,
  cache
) => {
  betterUpdateQuery<LoginMutation, MeQuery>(
    cache,
    { query: MeDocument },
    _result,
    (result, query) => {
      if (_result.errors) {
        return query;
      } else {
        return {
          me: result.login
        };
      }
    }
  );
};
