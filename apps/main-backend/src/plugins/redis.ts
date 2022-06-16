import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import Redis from 'ioredis';
import config from '../config';
import { isTesting } from '../constants/isTesting';

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis
  }
}

export const redis = new Redis({
  db: isTesting ? 1 : 0,
  ...config.redis.instance
});

const redisPlugin: FastifyPluginAsync = fp(async (app) => {
  app.decorate('redis', redis);
});

export default redisPlugin;
