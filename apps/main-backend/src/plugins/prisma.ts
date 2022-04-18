import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'error' }
  ]
});


const prismaPlugin: FastifyPluginAsync = fp(async (app) => {
  prisma.$on('error', (e) => {
    app.log.error(e);
  });

  prisma.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();
  
    app.log.info(`Query ${params.model}.${params.action} took ${after - before}ms`);

    return result;
  });

  app.addHook('onClose', async (_app) => {
    _app.log.info('Disconnecting Prisma from DB');

    await _app.prisma.$disconnect();
  });

  app.decorate('prisma', prisma);
  await prisma.$connect();
});

export default prismaPlugin;
