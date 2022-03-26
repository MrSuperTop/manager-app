import path from 'path';
import { buildSchema } from 'type-graphql';
import log from '../logger';

export const buildTypeGraphQLSchema = async () => {
  const resolversPath = path.join(
    __dirname, '../modules/**/*.resolver.js'
  );

  log.info(`Importing type-graphql resolvers from ${resolversPath}`);

  const schema = await buildSchema({
    resolvers: [
      resolversPath
    ]
  });

  return schema;
};
