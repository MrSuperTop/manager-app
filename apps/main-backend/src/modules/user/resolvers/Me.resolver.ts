import { User } from '../../../entities/User';
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { ContextWithSession } from '../../../types/Context';
import { isAuth } from '../../../middleware/isAuth';

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth())
  @Query(() => User)
  async me (
    @Ctx() { session: { data }, prisma }: ContextWithSession
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
