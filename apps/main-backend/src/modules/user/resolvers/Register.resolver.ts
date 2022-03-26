import { User } from '../../../entities/User';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { RegisterInput } from '../inputs/Register.input';
import { createUser } from '../services/user.service';
import { hash } from 'argon2';
import { Session } from '@nx-manager-app/session-handler';
import { v4 as uuid } from 'uuid';
import { MyContext } from '../../../types/MyContext';
import { SessionData } from '../../../types/SessionData';
import { getSessionOptions } from '../../../utils/setSessionConfig';

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User)
  async register (
    @Arg('input') input: RegisterInput,
    @Ctx() { reply }: MyContext
  ) {
    const password = await hash(input.password);
    const user = await createUser({
      ...input,
      password
    });

    const sessionId = uuid();
    const session = new Session<SessionData>(getSessionOptions({
      reply,
      sessionId
    }));

    session.data.userId = user.id;
    session.setCookie();

    return user;
  }
}
