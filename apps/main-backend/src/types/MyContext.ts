import { Session } from '@nx-manager-app/session-handler';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SessionData } from './SessionData';

export interface MyContext {
  req: FastifyRequest,
  reply: FastifyReply
}

export interface MyContextWithSession extends MyContext {
  session: Session<SessionData>
}