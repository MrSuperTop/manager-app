import 'reflect-metadata';
import fastifyCookie from '@fastify/cookie';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import prismaPlugin from '../plugins/prisma';
import mercuriusPlugin from '../plugins/mercurius';
import redisPlugin from '../plugins/redis';


// * Tracing deps
import openTelemetryPlugin from '@autotelic/fastify-opentelemetry';
import { useTracing } from '../constants/useTracing';
import log from '../logger';
import config from '../config';

export const createApp = async () => {
  const app = fastify({
    logger: log
  });

  if (useTracing) {
    await app.register(openTelemetryPlugin, {
      wrapRoutes: true
    });
  }

  await app.register(fastifyCors, config.corsConfig);
  await app.register(fastifyCookie, {
    secret: config.cookies.secret
  });

  await app.register(prismaPlugin);
  await app.register(redisPlugin);
  await app.register(mercuriusPlugin);

  return app;
};