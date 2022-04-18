import { MiddlewareFn, NextFn } from 'type-graphql';
import config from '../config';
import { ContextWithSession } from '../types/Context';
import { UserSession } from '../utils/UserSession';

const notAuthError = new Error('Not Authenticated');

export const isAuth = (
  createSession = true
): MiddlewareFn<ContextWithSession> => {
  return async (
    { context },
    next: NextFn
  ) => {
    const cookieName = config.session.cookie.name;
    let sessionId = context.req.cookies[cookieName];
    if (!sessionId) {
      throw notAuthError;
    }

    if (!createSession) {
      return next();
    }

    sessionId = context.req.unsignCookie(sessionId).value;

    const loadedSession = new UserSession({
      redis: context.redis,
      reply: context.reply,
      sessionId
    });
  
    await loadedSession.load();
    context.session = loadedSession;
  
    return next();
  };
};
