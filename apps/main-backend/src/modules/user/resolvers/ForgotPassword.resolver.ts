import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { sendEmail } from '../../../utils/emails/sendEmail';
import config from '../../../config';
import { getRedisKey } from '../../../utils/getRedisKey';
import { Context } from '../../../types/Context';
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
  @Mutation(() => String)
  async forgotPassword (
    @Arg('email') email: string,
    @Ctx() { prisma, redis }: Context
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
