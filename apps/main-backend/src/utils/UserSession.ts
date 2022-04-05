import { Session } from '@nx-manager-app/session-handler';
import config from '../config';
import Redis from 'ioredis';
import { SessionData } from '../types/SessionData';
import { FastifyReply } from 'fastify';

export interface UserSessionOptions {
  redis: Redis,
  reply: FastifyReply,
  sessionId: string | number,
  userId?: string | number
}

export class UserSession extends Session<SessionData> {
  constructor ({
    redis,
    reply,
    sessionId,
    userId
  }: UserSessionOptions) {
    super({
      sessionId: Number(sessionId),
      redis: {
        client: redis,
        prefix: config.redis.namespaces.sessionData.prefix
      },
      reply: reply,
      cookie: config.session.cookie
    }, userId ? {
      userId: Number(userId)
    } : null);
  }
}