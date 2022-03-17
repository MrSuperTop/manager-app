import { FastifyCorsOptions } from 'fastify-cors';

const config = {
  port: 4000,
  host: 'localhost',
  corsConfig: {
    credentials: true,
    origin: 'http://localhost:3000'
  } as FastifyCorsOptions
};

export default config;
