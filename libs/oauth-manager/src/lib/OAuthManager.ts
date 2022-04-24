import { Session } from '@nx-manager-app/session-handler';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Method } from './Method';
import { InvalidMethodName } from './shared/errors';

export interface FastifyObjects {
  req: FastifyRequest,
  reply: FastifyReply
}

export interface AdditionalRegisterData {
  username: string
}

export abstract class OAuthManager<S extends Session<object>, U, K extends string> {
  protected methods: Record<string, Method<K>> = {};

  use (method: Method<K>) {
    this.methods[method.name] = method;
  }

  getAuthUrls () {
    const urls: Record<string, string> = {};

    for (const [key, method] of Object.entries(this.methods)) {
      urls[key] = method.getAuthUrl();
    }

    return urls;
  }

  getMethod (name: K) {
    const method = this.methods[name];

    if (!method) {
      throw InvalidMethodName(name);
    }

    return method;
  }

  abstract register (
    methodName: K,
    code: string,
    data: AdditionalRegisterData,
    objects: FastifyObjects
  ): Promise<{
    session: S
    user: U
  }>;

  abstract login (
    methodName: K,
    code: string,
    objects: FastifyObjects
  ): Promise<{
    session: S
    user: U
  }>;
}
