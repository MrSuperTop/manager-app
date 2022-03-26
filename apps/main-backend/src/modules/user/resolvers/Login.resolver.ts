import { User } from '../../../entities/User';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { LoginInput } from '../inputs/Login.input';
import dayjs from 'dayjs';
import mercurius from 'mercurius';
import { prisma } from '../../../utils/setupPrisma';
import { isEmail } from '@nx-manager-app/shared-utils';
import { verify } from 'argon2';
import { SessionData } from '../../../types/SessionData';
import { Session } from '@nx-manager-app/session-handler';
import { getSessionOptions } from '../../../utils/setSessionConfig';
import { MyContext } from '../../../types/MyContext';
import { v4 as uuid } from 'uuid';

const { ErrorWithProps } = mercurius;
const invalidCredentialsError = new ErrorWithProps('Invalid login cretentials', {
  code: 'INVALID_CRETENDIALS',
  timestamp: dayjs().toISOString()
});

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User)
  async login (
    @Arg('input') {
      password,
      usernameOrEmail
    }: LoginInput,
    @Ctx() { reply }: MyContext
  ) {
    const user = await prisma.user.findUnique({
      where: isEmail(usernameOrEmail)
        ? {
            email: usernameOrEmail
          }
        : {
            username: usernameOrEmail
          }
    });

    if (!user) {
      throw invalidCredentialsError;
    }

    const valid = await verify(user.password, password);

    if (!valid) {
      throw invalidCredentialsError;
    }

    const sessionId = uuid();
    const session = new Session<SessionData>(getSessionOptions({
      reply,
      sessionId
    }));

    session.data.userId = user.id;

    return user;
  }
}
