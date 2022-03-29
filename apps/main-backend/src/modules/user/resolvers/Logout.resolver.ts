import { Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { MyContextWithSession } from '../../../types/MyContext';
import { isAuth } from '../../../middleware/isAuth';
import { deleteSession } from '../services/session.service';

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async logout (
    @Ctx() { session }: MyContextWithSession
  ) {
    await deleteSession({
      id: session.id
    });

    const result = await session.destroy();

    return result;
  }
}
