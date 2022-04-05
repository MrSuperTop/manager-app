import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import Redis from 'ioredis';
import config from '../config';

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis
  }
}

const redisPlugin: FastifyPluginAsync = fp(async (app) => {
  const { port, host } = config.redis;
  const redis = new Redis(port, host);

  app.decorate('redis', redis);
});

export default redisPlugin;
