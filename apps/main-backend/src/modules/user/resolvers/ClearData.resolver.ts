import { Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { ContextWithSession } from '../../../types/Context';
import { isAuth } from '../../../middleware/isAuth';
import { getRedisKey } from '../../../utils/getRedisKey';

@Resolver()
export class ClearDataResolver {
  @UseMiddleware(isAuth())
  @Mutation(() => Boolean)
  async clearData (
    @Ctx() { session, prisma, redis }: ContextWithSession
  ) {
    const user = await prisma.user.delete({
      where: {
        id: session.data.userId
      },
      include: {
        sessions: true
      }
    });

    const keys = user.sessions.map((session) => {
      return getRedisKey('sessionData', session.userId.toString()).key;
    });

    await redis.del(keys);

    session.clearCookie();

    return true;
  }
}
