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
const { port, host } = config.redis;
export const redis = new Redis(port, host, {
  db: isTesting ? 1 : 0
});

const redisPlugin: FastifyPluginAsync = fp(async (app) => {
  app.decorate('redis', redis);
});

export default redisPlugin;
