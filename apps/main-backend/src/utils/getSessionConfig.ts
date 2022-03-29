import { SessionOptions } from '@nx-manager-app/session-handler';
import config from '../config';
import log from '../logger';
import { prisma } from './setupPrisma';
import { redis } from './setupRedis';

export type neededConfig = Pick<SessionOptions, 'sessionId' | 'reply'>;
export const getSessionOptions = ({
  sessionId,
  reply
}: neededConfig): SessionOptions => {
  return {
    sessionId,
    prisma: prisma,
    redis: {
      client: redis,
      prefix: config.redis.prefixes.sessionData
    },
    logger: log,
    reply,
    cookie: config.session.cookie
  };
};
