import { FastifyReply } from 'fastify';
import { CookieSerializeOptions } from '@fastify/cookie';
import Redis from 'ioredis';
import { SessionId } from './SessionId';

export interface CookieConfig extends CookieSerializeOptions {
  name: string
}

export interface SessionOptions {
  redis: {
    client: Redis,
    prefix: string
  },
  sessionId: SessionId,
  reply: FastifyReply,
  cookie: CookieConfig,
}
