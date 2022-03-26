import Redis from 'ioredis';
import config from '../config';

export const setupRedis = (): Redis => {
  const { port, host } = config.redis;
  const redis = new Redis(port, host);

  return redis;
};

export const redis = setupRedis();
