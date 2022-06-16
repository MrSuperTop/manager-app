import 'reflect-metadata';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import log from './logger';
import config from './config';
import fastifyCookie from '@fastify/cookie';

import prismaPlugin from './plugins/prisma';
import mercuriusPlugin from './plugins/mercurius';
import redisPlugin from './plugins/redis';

const PORT = process.env.PORT || config.port;

const main = async () => {
  const app = fastify({
    logger: log
  });

  await app.register(fastifyCors, config.corsConfig);
  await app.register(fastifyCookie, {
    secret: config.cookies.secret
  });

  await app.register(prismaPlugin);
  await app.register(redisPlugin);
  await app.register(mercuriusPlugin);

  app.listen(PORT, config.host, (error) => {
    if (error !== null) {
      log.error(error);
    }
  });

  return app;
};

export default main();
