import { User } from '../../../../entities/User';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../../../types/Context';
import config from '../../../../config';
import { alreadyLoggedInError, invalidCodeError } from '../../../../constants/errors';
import { redis } from '../../../../utils/setupRedis';
import { createUser } from '../../services/user.service';
import { githubAuth } from './shared/auth';
import { UserSession } from '../../../../utils/UserSession';

@Resolver(User)
export class GithubRegisterResolver {
  @Mutation(() => User)
  async githubRegister (
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

    const githubUser = await githubAuth.getUser();
    const primaryEmail = githubUser.emails.find((email) => email.primary);

    const user = await createUser({
      authType: 'oauth',
      username: githubUser.data.login,
      email: primaryEmail.email,
      emailConfirmed: primaryEmail.verified,
      sessions: {
        create: {
          userAgent: req.headers['user-agent']
        }
      }
    }, prisma);

    const session = new UserSession({
      redis,
      reply,
      sessionId: user.sessions[0].id,
      userId: user.id
    });

    await session.setCookie().save();

    return user;
  }
}
