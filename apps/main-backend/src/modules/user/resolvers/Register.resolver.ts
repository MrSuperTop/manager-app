import { User } from '../../../entities/User';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { RegisterInput } from '../inputs/Register.input';
import { hash } from 'argon2';
import { Session } from '@nx-manager-app/session-handler';
import { MyContext } from '../../../types/MyContext';
import { SessionData } from '../../../types/SessionData';;
import { prisma } from '../../../utils/setupPrisma';
import { redis } from '../../../utils/setupRedis';
import config from '../../../config';
import { alreadyLoggedInError } from '../../../constants/errors';

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User)
  async register (
    @Arg('input') input: RegisterInput,
    @Ctx() { req, reply }: MyContext
  ) {
    if (req.cookies[config.session.cookie.name]) {
      throw alreadyLoggedInError;
    }

    const password = await hash(input.password);
    const user = await prisma.user.create({
      data: {
        ...input,
        password,
        sessions: {
          create: {
            userAgent: req.headers['user-agent']
          }
        }
      },
      include: {
        sessions: true
      }
    });

    const session = new Session<SessionData>({
      sessionId: user.sessions[0].id,
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
