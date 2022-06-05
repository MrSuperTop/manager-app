import { Prisma } from '@prisma/client';
import log from '../../../logger';
import { prisma } from '../../../plugins/prisma';
import { alreadyTakenError } from '../../../constants/errors';

export const createUser = async (
  data: Prisma.UserCreateInput
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
        throw alreadyTakenError;
      } else {
        log.error(e);
      }
    }
  }
};
