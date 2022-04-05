import { User } from '../../../entities/User';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { LoginInput } from '../inputs/Login.input';
import { isEmail } from '@nx-manager-app/shared-utils';
import { verify } from 'argon2';
import { Context } from '../../../types/Context';
import { createSession } from '../services/session.service';
import config from '../../../config';
import { alreadyLoggedInError, invalidCredentialsError } from '../../../constants/errors';
import { redis } from '../../../utils/setupRedis';
import { UserSession } from '../../../utils/UserSession';
@Resolver(User)
export class LoginResolver {
  @Mutation(() => User)
  async login (
    @Arg('input') {
      password,
      usernameOrEmail
    }: LoginInput,
    @Ctx() { req, reply, prisma }: Context
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

    if (!user || user.authType === 'oauth') {
      throw invalidCredentialsError;
    }

    const valid = await verify(user.password, password);

    if (!valid) {
      throw invalidCredentialsError;
    }

    const dbSession = await createSession({
      userId: user.id,
      userAgent: req.headers['user-agent']
    }, prisma);

    const session = new UserSession({
      redis,
      reply,
      sessionId: dbSession.id,
      userId: user.id
    });

    await session.setCookie().save();

    return user;
  }
}
