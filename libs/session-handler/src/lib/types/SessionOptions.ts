import { FastifyReply } from 'fastify';
import { CookieSerializeOptions } from 'fastify-cookie';
import Redis from 'ioredis';
import { Logger } from 'pino';

export interface CookieConfig extends CookieSerializeOptions {
  name: string
}

export interface SessionOptions {
  redis: {
    client: Redis,
    prefix: string
  },
  logger: Logger,
  sessionId: string,
  reply: FastifyReply,
  cookie: CookieConfig
}
