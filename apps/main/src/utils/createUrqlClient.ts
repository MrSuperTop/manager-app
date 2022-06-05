import { ClientOptions, dedupExchange, fetchExchange } from 'urql';
import { NextUrqlClientConfig } from 'next-urql';
import { isServer } from './isServer';
import { NextPageContext } from 'next';
import { cacheExchange } from '@urql/exchange-graphcache';
import { logoutUpdate } from './updates/logout';
import { loginUpdate } from './updates/login';
import { registerUpdate } from './updates/register';
import { confirmEmailUpdate } from './updates/confirmEmail';

export const getUrqlClientConfig: NextUrqlClientConfig = (
  ssrExchange,
  ctx: NextPageContext
): ClientOptions => {
  let cookie: string | undefined = '';
  if (ctx && isServer()) {
    cookie = ctx?.req?.headers.cookie;
  }

  const config: ClientOptions = {
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials: 'include',
      headers: cookie ? {
        cookie
      } : undefined
    },

    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            logout: logoutUpdate,
            login: loginUpdate,
            register: registerUpdate,
            confirmEmail: confirmEmailUpdate,
            clearData: logoutUpdate
          }
        }
      }),
      ssrExchange,
      fetchExchange
    ]
  };

  return config;
};
