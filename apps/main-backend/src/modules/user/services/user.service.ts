import { Prisma, User } from '@prisma/client';
import log from '../../../logger';
import dayjs from 'dayjs';
import mercurius from 'mercurius';
import { prisma } from '../../../utils/setupPrisma';
import { RegisterInput } from '../inputs/Register.input';

const { ErrorWithProps } = mercurius;

export const createUser = async (
  input: RegisterInput
) => {
  try {
    const user = await prisma.user.create({
      data: input
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

export const findUser = async (
  id: number
): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      id
    }
  });


  return user;
};