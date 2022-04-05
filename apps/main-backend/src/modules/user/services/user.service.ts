import { Prisma, PrismaClient } from '@prisma/client';
import log from '../../../logger';
import dayjs from 'dayjs';
import mercurius from 'mercurius';

const { ErrorWithProps } = mercurius;

export const createUser = async (
  data: Prisma.UserCreateInput,
  prisma: PrismaClient
) => {
  try {
    const user = await prisma.user.create({
      data,
      include: {
        sessions: true
      }
    });

    return user;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new ErrorWithProps('This username or email is taken', {
          code: 'INVALID_DATA',
          timestamp: dayjs().toISOString()
        });
      } else {
        log.error(e);
      }
    }
  }
};
