import { MeDocument } from '../../generated/graphql';
import { UpdateResolver } from '@urql/exchange-graphcache';

export const logoutUpdate: UpdateResolver = (
  _result,
  _,
  cache
) => {
  cache.updateQuery(
    { query: MeDocument },
    () => {
      return {
        me: null
      };
    }
  );
};
