import { User } from '../../../../entities/User';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../../../types/Context';
import config from '../../../../config';
import { alreadyLoggedInError, invalidCodeError, invalidCredentialsError } from '../../../../constants/errors';
import { redis } from '../../../../utils/setupRedis';
import { githubAuth } from './shared/auth';
import { createSession } from '../../services/session.service';
import { UserSession } from '../../../../utils/UserSession';

@Resolver(User)
export class GithubLoginResolver {
  @Mutation(() => User)
  async githubLogin (
    @Arg('code') code: string,
    @Ctx() { req, reply, prisma }: Context
  ) {
    if (req.cookies[config.session.cookie.name]) {
      throw alreadyLoggedInError;
    }

    const token = await githubAuth.authenticate(code);

    if (!token) {
      throw invalidCodeError;
    }

    const data = await githubAuth.getUser();
    const primaryEmail = data.emails.find((email) => email.primary).email;

    const user = await prisma.user.findUnique({
      where: {
        email: primaryEmail
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
