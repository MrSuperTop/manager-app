import axios, { AxiosResponse } from 'axios';
import { FullUserInfo } from '../types/github';

interface GithubAuthManagerOptions {
  clientId: string,
  clientSecret: string
}

export class GithubAuthManager {
  public clientId: string;
  public clientSecret: string;
  public accessToken: string;

  constructor (options: GithubAuthManagerOptions) {
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
  }

  async authenticate (code: string): Promise<string | null> {
    const response = await axios.post<{
      access_token: string,
      token_type: string,
      scope: string
    }>('https://github.com/login/oauth/access_token', {}, {
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code
      },
      headers: {
        Accept: 'application/json'
      }
    });

    if (response.status !== 200) {
      return;
    }

    this.accessToken = response.data.access_token;

    return response.data.access_token;
  }

  async getUser (): Promise<FullUserInfo> {
    const promises = [];

    const github = await axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });

    promises.push(github.get('/user'));
    promises.push(github.get('/user/emails'));

    const responses = await Promise.all<AxiosResponse[]>(promises);
    const data = responses.map((res) => res.data);

    return {
      data: data[0],
      emails: data[1]
    };
  }
}