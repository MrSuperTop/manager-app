import { FastifyPluginAsync, FastifyRegisterOptions } from 'fastify';
import mercurius, { MercuriusOptions } from 'mercurius';
import { Context } from '../types/Context';
import { buildTypeGraphQLSchema } from '../utils/buildTypeGraphQLSchema';
import fp from 'fastify-plugin';

const mercuriusPlugin: FastifyPluginAsync = fp(async (app) => {
  const schema = await buildTypeGraphQLSchema();
  const options: FastifyRegisterOptions<MercuriusOptions> = {
    schema,
    context: (
      req,
      reply
    ): Context => {
      return {
        req,
        reply,
        prisma: app.prisma,
        redis: app.redis
      };
    },
    jit: 1,
    graphiql: false,
    ide: false
  };

  await app.register(mercurius, options);
});

export default mercuriusPlugin;
