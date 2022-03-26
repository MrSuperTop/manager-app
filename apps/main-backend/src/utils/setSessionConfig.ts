import { SessionOptions } from '@nx-manager-app/session-handler';
import config from '../config';
import log from '../logger';
import { redis } from './setupRedis';

export type neededConfig = Pick<SessionOptions, 'sessionId' | 'reply'>;
export const getSessionOptions = ({
  sessionId,
  reply
}: neededConfig): SessionOptions => {
  return {
    sessionId,
    redis: {
      client: redis,
      prefix: config.session.prefix
    },
    logger: log,
    reply,
    cookie: config.session.cookie
  };
};
