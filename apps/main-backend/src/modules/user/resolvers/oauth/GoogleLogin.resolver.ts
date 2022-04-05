import { User } from '../../../../entities/User';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../../../types/Context';
import config from '../../../../config';
import { alreadyLoggedInError, invalidCredentialsError } from '../../../../constants/errors';
import { getGoogleAccountInfo } from '../../../../utils/google/getGoogleAccountInfo';
import { redis } from '../../../../utils/setupRedis';
import { googleAuth } from './shared/auth';
import { createSession } from '../../services/session.service';
import { UserSession } from '../../../../utils/UserSession';

@Resolver(User)
export class GoogleLoginResolver {
  @Mutation(() => User)
  async googleLogin (
    @Arg('code') code: string,
    @Ctx() { req, reply, prisma }: Context
  ) {
    if (req.cookies[config.session.cookie.name]) {
      throw alreadyLoggedInError;
    }

    const data = await getGoogleAccountInfo(googleAuth, code, [
      'emailAddresses',
      'names'
    ]);

    const user = await prisma.user.findUnique({
      where: {
        email: data.emailAddresses[0].value
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
