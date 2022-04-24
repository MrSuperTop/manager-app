import { FastifyInstance } from 'fastify';
import { DocumentNode } from 'graphql';
import { QueryOptions } from './types/QueryOptions';

export interface Cookie {
  name: string,
  value: string,
  maxAge: number,
  path: string,
  httpOnly: boolean,
  sameSite: string
}

export class TestClient {
  public app: FastifyInstance;
  public cookies: Record<string, string> = {};
  public headers: Record<string, string> = {};

  constructor (app: FastifyInstance) {
    this.app = app;
  }

  async query (
    query: DocumentNode,
    options: QueryOptions = {
      applyCookies: true
    }
  ) {
    const response = await this.app.inject({
      method: 'POST',
      url: '/graphql',
      cookies: {
        ...this.cookies,
        ...options?.cookies
      },
      headers: {
        'content-type': 'application/json; charset=utf-8',
        ...this.headers,
        ...options?.headers
      },
      payload: JSON.stringify({
        query: query?.loc?.source.body,
        variables: options?.variables
      })
    });

    if (options?.applyCookies === false) return response;

    const formatted: Record<string, string> = {};
    for (const cookie of response.cookies as Cookie[]) {
      formatted[cookie.name] = cookie.value;
    }

    this.cookies = {
      ...this.cookies,
      ...formatted
    };

    return response;
  }

  clearCookies () {
    this.cookies = {};
  }
}