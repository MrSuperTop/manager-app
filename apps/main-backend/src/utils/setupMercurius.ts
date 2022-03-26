import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import mercurius, { MercuriusOptions } from 'mercurius';
import { MyContext } from '../types/MyContext';
import { buildTypeGraphQLSchema } from './buildTypeGraphQLSchema';

export const setupMercurius = async (
  app: FastifyInstance
): Promise<void> => {
  const schema = await buildTypeGraphQLSchema();
  const options: FastifyRegisterOptions<MercuriusOptions> = {
    schema,
    context: (
      req,
      reply
    ): MyContext => {
      return {
        req,
        reply
      };
    },
    jit: 1
  };

  await app.register(mercurius, options);
};
