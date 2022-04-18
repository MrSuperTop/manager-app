import { User } from '../../../entities/User';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { RegisterInput } from '../inputs/Register.input';
import { hash } from 'argon2';
import { Context } from '../../../types/Context';
import config from '../../../config';
import { alreadyLoggedInError } from '../../../constants/errors';
import { createUser } from '../services/user.service';
import { UserSession } from '../../../utils/UserSession';

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User)
  async register (
    @Arg('input') input: RegisterInput,
    @Ctx() { req, reply, redis }: Context
  ) {
    if (req.cookies[config.session.cookie.name]) {
      throw alreadyLoggedInError;
    }

    const password = await hash(input.password);
    const user = await createUser({
      ...input,
      password,
      sessions: {
        create: {
          userAgent: req.headers['user-agent']
        }
      }
    });

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
