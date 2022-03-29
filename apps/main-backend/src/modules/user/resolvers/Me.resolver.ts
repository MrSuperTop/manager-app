import { User } from '../../../entities/User';
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { MyContextWithSession } from '../../../types/MyContext';
import { isAuth } from '../../../middleware/isAuth';
import { prisma } from '../../../utils/setupPrisma';

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth)
  @Query(() => User)
  async me (
    @Ctx() { session: { data } }: MyContextWithSession
  ) {
    const user = await prisma.user.findUnique({
      where: {
        id: data.userId
      },
      include: {
        sessions: true
      }
    });

    return user;
  }
}
