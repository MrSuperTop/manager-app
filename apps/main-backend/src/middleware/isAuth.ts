import { Session } from '@nx-manager-app/session-handler';
import { MiddlewareFn, NextFn } from 'type-graphql';
import config from '../config';
import { MyContextWithSession } from '../types/MyContext';
import { SessionData } from '../types/SessionData';
import { redis } from '../utils/setupRedis';

const notAuthError = new Error('Not Authenticated');

export const isAuth: MiddlewareFn<MyContextWithSession> = async (
  { context },
  next: NextFn
) => {
  const cookieName = config.session.cookie.name;
  let sessionId = context.req.cookies[cookieName];
  if (!sessionId) {
    throw notAuthError;
  }

  sessionId = context.req.unsignCookie(sessionId).value;

  const loadedSession = new Session<SessionData>({
    sessionId: Number(sessionId),
    redis: {
      client: redis,
      prefix: config.redis.namespaces.sessionData.prefix
    },
    reply: context.reply,
    cookie: config.session.cookie
  });

  await loadedSession.load();
  context.session = loadedSession;

  return next();
};
