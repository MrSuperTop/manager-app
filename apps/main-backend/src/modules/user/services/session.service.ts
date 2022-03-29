import { Prisma } from '@prisma/client';
import { prisma } from '../../../utils/setupPrisma';

export const createSession = async (
  data: Prisma.SessionCreateArgs['data']
) => {
  const session = await prisma.session.create({
    data
  });

  return session;
};

export const deleteSession = async (
  where: Prisma.SessionDeleteArgs['where']
) => {
  const deletedSession = await prisma.session.delete({
    where
  });

  return deletedSession;
};
