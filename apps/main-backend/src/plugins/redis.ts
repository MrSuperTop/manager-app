import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import Redis from 'ioredis';
import config from '../config';

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis
  }
}
const { port, host } = config.redis;
export const redis = new Redis(port, host);

const redisPlugin: FastifyPluginAsync = fp(async (app) => {
  app.decorate('redis', redis);
});

export default redisPlugin;
