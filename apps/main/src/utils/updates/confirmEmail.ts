import { UpdateResolver } from '@urql/exchange-graphcache';
import { ConfirmEmailMutation, MeDocument, MeQuery } from '../../generated/graphql';
import { betterUpdateQuery } from '../betterUpdateQuery';

export const confirmEmailUpdate: UpdateResolver = (
  _result,
  _,
  cache
) => {
  betterUpdateQuery<ConfirmEmailMutation, MeQuery>(
    cache,
    { query: MeDocument },
    _result,
    (result, query) => {
      if (_result.errors || !result.confirmEmail) {
        return query;
      } else {
        return {
          me: {
            ...query.me,
            emailConfirmed: true
          }
        };
      }
    }
  );
};
