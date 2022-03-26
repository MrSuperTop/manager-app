import { User } from '../../../entities/User';
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { MyContextWithSession } from '../../../types/MyContext';
import { isAuth } from '../../../middleware/isAuth';
import { findUser } from '../services/user.service';

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth)
  @Query(() => User)
  async me (
    @Ctx() { session: { data } }: MyContextWithSession
  ) {
    const user = await findUser(data.userId);

    return user;
  }
}