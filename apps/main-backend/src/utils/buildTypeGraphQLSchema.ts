import path from 'path';
import { buildSchema } from 'type-graphql';
import { HealthCheckResolver } from '../modules/healthcheck/HealthCheck.resolver';

export const buildTypeGraphQLSchema = async () => {
  const resolversPath = path.join(
    __dirname, '../modules/**/*.resolver.js'
  );

  const schema = await buildSchema({
    resolvers: [
      HealthCheckResolver
    ]
  });

  return schema;
};
