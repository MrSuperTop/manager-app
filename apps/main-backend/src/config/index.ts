import { CookieConfig } from '@nx-manager-app/session-handler';
import { FastifyCorsOptions } from '@fastify/cors';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';
import { isProd } from '../constants/isProd';

interface GmailTransporterConfig {
  host: string,
  port: number,
  auth: {
    type: 'oauth2',
    user: string
  }
};

interface TestTransporterConfig {
  host: string,
  port: number,
  auth: {
    user: string,
    pass: string
  }
};

export type TransporterConfig = GmailTransporterConfig | TestTransporterConfig;

export type namespaces = 'registrationConfirmation' | 'sessionData' | 'forgotPassword';
export interface RedisNamespaceConfig {
  prefix: string,
  expires: number
}

export interface OAuthProviderConfig {
  clientId: string,
  clientSecret: string,
  redirect: string
}

interface Config {
  port: number,
  host: string,
  corsConfig: FastifyCorsOptions,
  cookies: {
    secret: string
  },
  tracing: boolean
  oauth: Record<'google' | 'github' | 'discord', OAuthProviderConfig>,
  session: {
    cookie: CookieConfig
  },
  redis: {
    instance: {
      username: string
      password: string
      port: number
      host: string
    },
    namespaces: Record<namespaces, RedisNamespaceConfig>
  },
  emails: {
    gmail?: {
      client_id: string,
      client_secret: string,
      redirect_uri: string,
      refresh_token: string
    },
    nodemailer: {
      transporter: TransporterConfig
    }
  }
}

let relativeFilePath = '../dev.yml';
if (isProd) {
  relativeFilePath = '../prod.yml';
}

const file = readFileSync(join(__filename, relativeFilePath)).toString();
const config: Config = parse(file);

export default config;
