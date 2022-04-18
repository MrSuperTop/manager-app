import { User } from '../../../../entities/User';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../../../types/Context';
import config from '../../../../config';
import { alreadyLoggedInError } from '../../../../constants/errors';
import { manager } from './shared/auth';

@Resolver(User)
export class OAuthLoginResolver {
  @Mutation(() => User)
  async oauthLogin (
    @Arg('provider') provider: string,
    @Arg('code') code: string,
    @Ctx() { req, reply }: Context
  ) {
    if (req.cookies[config.session.cookie.name]) {
      throw alreadyLoggedInError;
    }

    const { user } = await manager.login(provider, code, {
      req,
      reply
    });

    return user;
  }
}
