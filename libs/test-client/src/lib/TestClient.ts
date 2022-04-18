import { FastifyInstance } from 'fastify';
import { DocumentNode } from 'graphql';
import { QueryOptions } from './types/QueryOptions';

export class TestClient {
  public app: FastifyInstance;
  public cookies: Record<string, string> = {};
  public headers: Record<string, string> = {};

  constructor (app: FastifyInstance) {
    this.app = app;
  }

  async query (query: DocumentNode, options?: QueryOptions) {
    const reponse = await this.app.inject({
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

    return reponse;
  }
}