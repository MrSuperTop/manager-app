import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from '../../../middleware/isAuth';
import { sendEmail } from '../../../utils/emails/sendEmail';
import config from '../../../config';
import { redis } from '../../../utils/setupRedis';
import { prisma } from '../../../utils/setupPrisma';
import { getRedisKey } from '../../../utils/getRedisKey';
import { getTemplate } from '../../../utils/emails/getTemplate';

const sendForgotPasswordEmail = async (
  email: string,
  token: string
) => {
  await sendEmail({
    to: email,
    html: getTemplate('changePassword', {
      origin: config.corsConfig.origin.toString(),
      token: token
    })
  });
};

@Resolver()
export class ForgotPasswordResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => String)
  async forgotPassword (
    @Arg('email') email: string
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) return true;

    const { expires, token, key } = getRedisKey('forgotPassword');
    await redis.set(
      key,
      user.id,
      'EX',
      expires
    );

    await sendForgotPasswordEmail(
      email,
      token
    );

    return true;
  }
}
