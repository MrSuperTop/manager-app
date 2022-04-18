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

export abstract class OAuthManager<S extends Session<object>, U> {
  protected methods: Record<string, Method> = {};

  use (method: Method) {
    this.methods[method.name] = method;
  }

  getAuthUrls () {
    const urls: Record<string, string> = {};

    for (const [key, method] of Object.entries(this.methods)) {
      urls[key] = method.getAuthUrl();
    }

    return urls;
  }

  getMethod (name: string) {
    const method = this.methods[name];

    if (!method) {
      throw InvalidMethodName(name);
    }

    return method;
  }

  abstract register (
    methodName: string,
    code: string,
    data: AdditionalRegisterData,
    objects: FastifyObjects
  ): Promise<{
    session: S
    user: U
  }>;

  abstract login (
    methodName: string,
    code: string,
    objects: FastifyObjects
  ): Promise<{
    session: S
    user: U
  }>;
}
