import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import mercurius, { MercuriusOptions } from 'mercurius';
import { buildTypeGraphQLSchema } from './buildTypeGraphQLSchema';

export const setupMercurius = async (
  app: FastifyInstance
): Promise<void> => {
  const schema = await buildTypeGraphQLSchema();
  const options: FastifyRegisterOptions<MercuriusOptions> = {
    schema,
    jit: 1
  };

  await app.register(mercurius, options);
};
