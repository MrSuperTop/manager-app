import { InjectOptions } from 'fastify';

export interface QueryOptions {
  cookies?: InjectOptions['cookies'],
  headers?: InjectOptions['headers'],
  variables?: object
}
