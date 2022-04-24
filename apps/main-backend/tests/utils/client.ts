import 'reflect-metadata';
import fastify, { FastifyRegisterOptions } from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyCors from 'fastify-cors';
import mercurius, { MercuriusOptions } from 'mercurius';
import config from '../../src/config';
import { Context } from '../../src/types/Context';
import prisma from './prisma';
import { TestClient } from '@nx-manager-app/test-client';
import { join } from 'path';
import { buildSchema } from 'type-graphql';
import redis from '../../src/plugins/redis';

export const createTestClient = () => {
  const app = fastify();

  beforeAll(async () => {
    await app.register(fastifyCors, config.corsConfig);
    await app.register(fastifyCookie, {
      secret: config.cookies.secret
    });

    const schema = await buildSchema({
      resolvers: [
        join(
          __dirname, '../../src/modules/**/*.resolver.ts'
        )
      ]
    });

    await app.register(redis);

    app.decorate('prisma', prisma);

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
      }
    };

    await app.register(mercurius, options);
    app.addHook('onClose', async () => {
      await prisma.$disconnect();
    });
  });

  afterAll(async () => {
    await app.close();
  });

  return new TestClient(app);
};
