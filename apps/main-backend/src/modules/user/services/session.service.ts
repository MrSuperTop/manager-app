import { Prisma, PrismaClient } from '@prisma/client';

// Incaplusate custom session class creation in the function
export const createSession = async (
  data: Prisma.SessionCreateArgs['data'],
  prisma: PrismaClient
) => {
  const session = await prisma.session.create({
    data
  });

  return session;
};

export const deleteSession = async (
  where: Prisma.SessionDeleteArgs['where'],
  prisma: PrismaClient
) => {
  const deletedSession = await prisma.session.delete({
    where
  });

  return deletedSession;
};
