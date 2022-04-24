import Redis from 'ioredis';
import config from '../src/config';
import { clear } from './utils/prisma';

module.exports = async () => {
  await clear();

  const { port, host } = config.redis;
  const redis = new Redis(port, host, {
    db: 1
  });

  await redis.flushdb();
};
