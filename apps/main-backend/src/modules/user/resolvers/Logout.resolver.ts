import { Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { ContextWithSession } from '../../../types/Context';
import { isAuth } from '../../../middleware/isAuth';
import { deleteSession } from '../services/session.service';

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth())
  @Mutation(() => Boolean)
  async logout (
    @Ctx() { session }: ContextWithSession
  ) {
    await deleteSession({
      id: session.id
    });

    const result = await session.destroy();

    return result;
  }
}
