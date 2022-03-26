import { Session } from '@nx-manager-app/session-handler';
import { MiddlewareFn, NextFn } from 'type-graphql';
import config from '../config';
import { MyContextWithSession } from '../types/MyContext';
import { SessionData } from '../types/SessionData';
import { getSessionOptions } from '../utils/setSessionConfig';

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

  const loadedSession = new Session<SessionData>(getSessionOptions({
    reply: context.reply,
    sessionId
  }));

  await loadedSession.load();
  context.session = loadedSession;

  return next();
};
