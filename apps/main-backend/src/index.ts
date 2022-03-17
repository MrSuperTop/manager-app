import 'reflect-metadata';
import fastify from 'fastify';
import { setupMercurius } from './utils/setupMercurius';
import fastifyCors from 'fastify-cors';
import log from './logger';
import config from './config';

const main = async () => {
  const app = fastify({
    logger: log
  });

  await app.register(fastifyCors, config.corsConfig);

  await setupMercurius(app);
  app.listen(config.port, config.host, (error) => {
    if (error !== null) {
      log.error(error);
    }
  });
};

void main();
