import { OAuth2Client } from 'google-auth-library';
import config from '../config';
import { AuthUrls } from '../modules/user/object-types/AuthUrls';

export interface Scopes {
  google: string[],
  github: string[]
}

export const getAuthUrls = (
  auth: OAuth2Client,
  scopes: Scopes
): AuthUrls => {
  const urls = {} as AuthUrls;
  urls['google'] = auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes.google.join(' ')
  });

  const githubParams = new URLSearchParams({
    client_id: config.oauth.github.clientId,
    redirect_uri: config.oauth.github.redirect,
    scope: scopes.github.join(' ')
  }).toString();

  urls['github'] =`https://github.com/login/oauth/authorize?${githubParams}`;

  return urls;
};
