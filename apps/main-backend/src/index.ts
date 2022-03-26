import 'reflect-metadata';
import fastify from 'fastify';
import { setupMercurius } from './utils/setupMercurius';
import fastifyCors from 'fastify-cors';
import log from './logger';
import config from './config';
import fastifyCookie from 'fastify-cookie';

const main = async () => {
  const app = fastify({
    logger: log
  });

  await app.register(fastifyCors, config.corsConfig);
  await app.register(fastifyCookie, {
    secret: config.cookies.secret
  });

  await setupMercurius(app);
  app.listen(config.port, config.host, (error) => {
    if (error !== null) {
      log.error(error);
    }
  });

  return app;
};

export default main();
