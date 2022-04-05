import { Session } from '@nx-manager-app/session-handler';
import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import Redis from 'ioredis';
import { SessionData } from './SessionData';

export interface Context {
  req: FastifyRequest,
  reply: FastifyReply,
  prisma: PrismaClient,
  redis: Redis
}

export interface ContextWithSession extends Context {
  session: Session<SessionData>
}