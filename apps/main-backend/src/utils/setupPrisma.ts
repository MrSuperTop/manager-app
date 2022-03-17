import { PrismaClient } from '@prisma/client';
import log from '../logger';

export const setupPrisma = () => {
  const prisma = new PrismaClient({
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'error' },
      { emit: 'stdout', level: 'info' },
      { emit: 'stdout', level: 'warn' }
    ]
  });

  prisma.$on('query', (e) => {
    log.info(`Query: ${e.query}`);
    log.info(`Duration: ${e.duration} ms`);
  });

  prisma.$on('error', (e) => {
    log.error(e);
  });

  return prisma;
};

export const prisma = setupPrisma();
