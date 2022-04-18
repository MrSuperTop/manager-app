import { User } from '../../../../entities/User';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../../../types/Context';
import config from '../../../../config';
import { alreadyLoggedInError } from '../../../../constants/errors';
import { manager } from './shared/auth';
import { OAuthRegisterInput } from '../../inputs/OAuthRegister.input';

@Resolver(User)
export class OAuthRegisterResolver {
  @Mutation(() => User)
  async oauthRegister (
    @Arg('provider') provider: string,
    @Arg('code') code: string,
    @Arg('input') input: OAuthRegisterInput,
    @Ctx() { req, reply }: Context
  ) {
    if (req.cookies[config.session.cookie.name]) {
      throw alreadyLoggedInError;
    }

    const { user } = await manager.register(provider, code, input, {
      req,
      reply
    });

    return user;
  }
}
