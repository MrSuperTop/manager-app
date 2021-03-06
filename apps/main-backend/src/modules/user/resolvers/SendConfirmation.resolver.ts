import { Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { ContextWithSession } from '../../../types/Context';
import { isAuth } from '../../../middleware/isAuth';
import { sendEmail } from '../../../utils/emails/sendEmail';
import { generateConfirmationCode } from '../../../utils/generateConfimationCode';
import { ConfirmationPayload } from '../../../types/ConfirmationPayload';
import { alreadyConfirmedEmail } from '../../../constants/errors';
import { getRedisKey } from '../../../utils/getRedisKey';
import { getTemplate } from '../../../utils/emails/getTemplate';

const sendConfirmationEmail = async (
  email: string,
  code: string
) => {
  await sendEmail({
    to: email,
    html: getTemplate('confirmEmail', {
      code
    })
  });
};

@Resolver()
export class SendConfirmationResolver {
  @UseMiddleware(isAuth())
  @Mutation(() => String)
  async sendConfirmation (
    @Ctx() { session: { data }, prisma, redis }: ContextWithSession
  ) {
    const user = await prisma.user.findUnique({
      where: {
        id: data.userId
      },
      select: {
        emailConfirmed: true,
        email: true
      }
    });

    if (user.emailConfirmed) {
      throw alreadyConfirmedEmail;
    }

    const { token, key } = getRedisKey('registrationConfirmation');
    const code = generateConfirmationCode();
    const payload: ConfirmationPayload = {
      code
    };

    await redis.set(
      key,
      JSON.stringify(payload),
      'EX',
      1000 * 60 * 60 * 3 // * 3 hours
    );

    await sendConfirmationEmail(
      user.email,
      code
    );

    return token;
  }
}
