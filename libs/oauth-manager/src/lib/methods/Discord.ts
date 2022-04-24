import axios, { AxiosInstance } from 'axios';
import { Client, Method } from '../Method';
import { UserEmails } from '../types/UserEmails';
import { pick } from 'lodash';
import { InvalidCode, NoEmailsData } from '../shared/errors';

export interface DiscordMethodOptions {
  clientId: string,
  clientSecret: string,
  redirect: string
}

export interface TokensReponse {
  access_token: string,
  token_type: 'Bearer',
  expires_in: number,
  refresh_token: string,
  scope: 'identify'
}

export interface UserDataResponse {
  id: string,
  username: string,
  avatar: string,
  discriminator: string,
  public_flags: number,
  flags: number,
  banner: string | null,
  banner_color: string,
  accent_color: number | null,
  locale: 'en-US',
  mfa_enabled: boolean,
  email: string | null,
  verified: boolean
}

class DiscordClient extends Client<UserEmails> {
  private axios: AxiosInstance;

  constructor (axios: AxiosInstance) {
    super();

    this.axios = axios;
  }

  async getEmails (): Promise<UserEmails> {
    const response = await this.axios.get<UserDataResponse>('/users/@me');
    if (typeof response.data.email !== 'string') {
      throw NoEmailsData;
    }

    const result = [{
      ...pick(response.data, 'verified'),
      email: response.data.email,
      primary: true
    }];

    return result;
  }
}

export class DiscordMethod extends Method<'discord'> {
  public name = 'discord' as const;
  public clientId: string;
  public clientSecret: string;
  public redirect: string;
  public accessToken: string | undefined;
  public baseURL = 'https://discord.com/api/v9';

  constructor (options: DiscordMethodOptions) {
    super();

    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.redirect = options.redirect;
  }

  getAuthUrl (scopes: string[] = ['email']) {
    const discordParams = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirect,
      response_type: 'code',
      scope: scopes.join(' ')
    }).toString();
  
    return `https://discord.com/api/oauth2/authorize?${discordParams}`;
  }

  async authenticate (code: string): Promise<DiscordClient> {
    const body = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      scope: 'indentify email',
      grant_type: 'authorization_code',
      redirect_uri: this.redirect,
      code
    }).toString();

    const response = await axios.post<TokensReponse>(`${this.baseURL}/oauth2/token`, body);

    if (response.status !== 200) {
      throw InvalidCode;
    }

    this.isAuthenticated = true;
    this.accessToken = response.data.access_token;

    const clientAxios = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });

    const client = new DiscordClient(clientAxios);

    return client;
  }
}
