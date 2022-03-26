import { CookieConfig } from '@nx-manager-app/session-handler';
import { FastifyCorsOptions } from 'fastify-cors';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';
interface Config {
  port: number,
  host: string,
  corsConfig: FastifyCorsOptions,
  cookies: {
    secret: string
  },
  session: {
    prefix: string,
    cookie: CookieConfig
  },
  redis: {
    port: number,
    host: string
  }
}

let relativeFilePath = '../dev.yaml';
if (process.env.NODE_ENV === 'production') {
  relativeFilePath = '../prod.yaml';
}

const file = readFileSync(join(__filename, relativeFilePath)).toString();
const config: Config = parse(file);

export default config;
