import { AdditionalRegisterData, FastifyObjects, OAuthManager as BaseOAuthManager } from '@nx-manager-app/oauth-manager';
import { PrismaClient, Session, User } from '@prisma/client';
import Redis from 'ioredis';
import { invalidCredentialsError } from '../constants/errors';
import { OAuthProvider } from '../modules/user/object-types/OAuthProvider';
import { createSession } from '../modules/user/services/session.service';
import { createUser } from '../modules/user/services/user.service';
import { UserSession } from './UserSession';

export interface OAuthManagerOptions {
  prisma: PrismaClient,
  redis: Redis
}

type FullUser = User & {
  sessions: Session[]
};

export class OAuthManager extends BaseOAuthManager<UserSession, FullUser, OAuthProvider> {
  prisma: PrismaClient;
  redis: Redis;

  constructor ({
    prisma,
    redis
  }: OAuthManagerOptions) {
    super();

    this.prisma = prisma;
    this.redis = redis;
  }

  async register (
    methodName: OAuthProvider,
    code: string,
    data: AdditionalRegisterData,
    {
      req,
      reply
    }: FastifyObjects
  ) {
    const client = await this.getMethod(methodName).authenticate(code);
    const emails = await client.getEmails();

    const primaryEmail = emails.find((email) => (
      email.primary
    ));

    const user = await createUser({
      authType: 'oauth',
      username: data.username,
      email: primaryEmail.email,
      emailConfirmed: primaryEmail.verified,
      sessions: {
        create: {
          userAgent: req.headers['user-agent']
        }
      }
    });

    const session = new UserSession({
      redis: this.redis,
      reply,
      sessionId: user.sessions[0].id,
      userId: user.id
    });

    await session.setCookie().save();

    return {
      user,
      session
    };
  }

  async login (
    methodName: OAuthProvider,
    code: string,
    {
      req,
      reply
    }
  ) {
    const client = await this.getMethod(methodName).authenticate(code);
    const emails = await client.getEmails();

    const primaryEmail = emails.find((email) => (
      email.primary
    ));

    const user = await this.prisma.user.findUnique({
      where: {
        email: primaryEmail.email
      },
      include: {
        sessions: true
      }
    });

    if (!user || user.authType !== 'oauth') {
      throw invalidCredentialsError;
    }

    const dbSession = await createSession({
      userId: user.id,
      userAgent: req.headers['user-agent']
    });

    const session = new UserSession({
      redis: this.redis,
      reply,
      sessionId: dbSession.id,
      userId: user.id
    });

    await session.setCookie().save();

    return {
      user,
      session
    };
  }
}