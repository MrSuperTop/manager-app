import { User } from '../../../entities/User';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { LoginInput } from '../inputs/Login.input';
import mercurius from 'mercurius';
import { isEmail } from '@nx-manager-app/shared-utils';
import { verify } from 'argon2';
import { SessionData } from '../../../types/SessionData';
import { Session } from '@nx-manager-app/session-handler';
import { MyContext } from '../../../types/MyContext';
import { createSession } from '../services/session.service';
import config from '../../../config';
import { alreadyLoggedInError } from '../../../constants/errors';
import { redis } from '../../../utils/setupRedis';
import { prisma } from '../../../utils/setupPrisma';

const { ErrorWithProps } = mercurius;
const invalidCredentialsError = new ErrorWithProps('Invalid login cretentials', {
  code: 'INVALID_CRETENDIALS',
  timestamp: new Date().toISOString()
});

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User)
  async login (
    @Arg('input') {
      password,
      usernameOrEmail
    }: LoginInput,
    @Ctx() { req, reply }: MyContext
  ) {
    if (req.cookies[config.session.cookie.name]) {
      throw alreadyLoggedInError;
    }

    const user = await prisma.user.findUnique({
      where: isEmail(usernameOrEmail)
        ? {
            email: usernameOrEmail
          }
        : {
            username: usernameOrEmail
          },
      include: {
        sessions: true
      }
    });

    if (!user) {
      throw invalidCredentialsError;
    }

    const valid = await verify(user.password, password);

    if (!valid) {
      throw invalidCredentialsError;
    }

    const dbSession = await createSession({
      userId: user.id,
      userAgent: req.headers['user-agent']
    });

    const session = new Session<SessionData>({
      sessionId: dbSession.id,
      redis: {
        client: redis,
        prefix: config.redis.namespaces.sessionData.prefix
      },
      reply,
      cookie: config.session.cookie
    });

    session.data = {
      userId: user.id
    };

    await session.setCookie().save();

    return user;
  }
}
