import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { ContextWithSession } from '../../../types/Context';
import { isAuth } from '../../../middleware/isAuth';
import { redis } from '../../../utils/setupRedis';
import { ConfirmEmailInput } from '../inputs/ConfirmEmail.input';
import { ConfirmationPayload } from '../../../types/ConfirmationPayload';
import { alreadyConfirmedEmail, tokenExpiredError } from '../../../constants/errors';
import { getRedisKey } from '../../../utils/getRedisKey';

@Resolver()
export class ConfirmEmailResolver {
  @UseMiddleware(isAuth())
  @Mutation(() => Boolean)
  async confirmEmail (
    @Arg('input') { token, code }: ConfirmEmailInput,
    @Ctx() { session: { data }, prisma }: ContextWithSession
  ) {
    const { key } = getRedisKey('registrationConfirmation', token);
    const rawConfirmationData = await redis.get(key);

    if (!rawConfirmationData) {
      throw tokenExpiredError;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: data.userId
      },
      select: {
        emailConfirmed: true
      }
    });

    if (!user) return false;
    if (user.emailConfirmed) {
      throw alreadyConfirmedEmail;
    }

    const confirmationData: ConfirmationPayload = JSON.parse(rawConfirmationData);

    if (confirmationData.code !== code) return false;

    await prisma.user.update({
      where: {
        id: data.userId
      },
      data: {
        emailConfirmed: true
      }
    });

    await redis.del(key);

    return true;
  }
}
