import axios, { AxiosInstance } from 'axios';
import { Client, Method } from '../Method';
import { InvalidCode } from '../shared/errors';
import { UserEmails } from '../types/UserEmails';

export interface GithubMethodOptions {
  clientId: string,
  clientSecret: string,
  redirect: string
}

interface AuthenticateResponse {
  access_token: string,
  token_type: string,
  scope: string,
  error?: string,
  error_description?: string,
  error_uri?: string
};

class GithubClient<T extends UserEmails> extends Client<T> {
  private axios: AxiosInstance;

  constructor (axios: AxiosInstance) {
    super();

    this.axios = axios;
  }

  async getEmails (): Promise<T> {
    const response = await this.axios.get<T>('/user/emails');

    return response.data;
  }
}

export class GithubMethod extends Method<'github'> {
  public name = 'github' as const;
  public clientId: string;
  public clientSecret: string;
  public redirect: string;
  public accessToken: string | undefined;

  constructor (options: GithubMethodOptions) {
    super();

    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.redirect = options.redirect;
  }

  getAuthUrl (scopes = ['user:email']) {
    const githubParams = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirect,
      scope: scopes.join(' ')
    }).toString();

    return `https://github.com/login/oauth/authorize?${githubParams}`;
  }

  async authenticate (code: string): Promise<GithubClient<UserEmails>> {
    const response = await axios.post<AuthenticateResponse>('https://github.com/login/oauth/access_token', {}, {
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code
      },
      headers: {
        Accept: 'application/json'
      }
    });

    if (response.data.error === 'bad_verification_code') {
      throw InvalidCode;
    }

    this.accessToken = response.data.access_token;
    this.isAuthenticated = true;

    const clientAxios = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });

    const client = new GithubClient(clientAxios);

    return client;
  }
}
