import config from '../../../../../config';
import { google } from 'googleapis';
import { GithubAuthManager } from '../../../../../utils/GithubAuthManager';

export const googleAuth = new google.auth.OAuth2(
  ...Object.values(config.oauth.google)
);

google.options({ auth: googleAuth });

export const githubAuth = new GithubAuthManager(config.oauth.github);
