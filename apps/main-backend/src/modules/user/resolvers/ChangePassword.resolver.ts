import { Arg, Mutation, Resolver } from 'type-graphql';
import { redis } from '../../../utils/setupRedis';
import { prisma } from '../../../utils/setupPrisma';
import { ChangePasswordInput } from '../inputs/ChangePassword.input';
import { User } from '../../../entities/User';
import { tokenExpiredError, userDoesNotExistsError } from '../../../constants/errors';
import { hash } from 'argon2';
import log from '../../../logger';
import { getRedisKey } from '../../../utils/getRedisKey';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User)
  async changePassword (
    @Arg('input') { token, newPassword }: ChangePasswordInput
  ) {
    const { key } = getRedisKey('forgotPassword', token);
    const rawUserId = await redis.get(key);

    if (!rawUserId) {
      throw tokenExpiredError;
    }

    const userId = parseInt(rawUserId);
    newPassword = await hash(newPassword);

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          password: newPassword
        },
        include: {
          sessions: true
        }
      });

      await redis.del(key);

      return updatedUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw userDoesNotExistsError;
      } else {
        log.error(error);
      }
    };
  }
}
