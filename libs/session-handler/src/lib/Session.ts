import Redis from 'ioredis';
import { Logger } from 'pino';
import { FastifyReply } from 'fastify';
import { CookieConfig, SessionOptions } from './types/SessionOptions';
import { omit } from 'lodash';

export class Session<T extends object> {
  private redisPrefix: string;
  private sessionId: string;
  private redis: Redis;
  private logger: Logger;
  private fastifyReply: FastifyReply;
  private cookieConfig: CookieConfig;

  private dataHandler = {
    get: (
      target: T,
      name: keyof T
    ) => {
      return target[name];
    },
    
    set: (
      target: T,
      name: keyof T,
      value: T[keyof T]
    ) => {
      const newValue = {
        ...target,
        [name]: value
      };

      target[name] = value;
      this.redis.set(this.redisKey, JSON.stringify(newValue));
  
      return true;
    }
  };

  public data: T;

  constructor (
    {
      redis,
      sessionId,
      logger,
      reply,
      cookie
    }: SessionOptions
  ) {
    this.redis = redis.client;
    this.redisPrefix = redis.prefix;
    this.sessionId = sessionId;
    this.logger = logger;
    this.fastifyReply = reply;
    this.cookieConfig = cookie;

    this.data = new Proxy<T>(Object(), this.dataHandler as ProxyHandler<T>);
  }

  async load (): Promise<boolean> {
    try {
      const restoredData = await this.redis.get(
        this.redisKey
      );

      if (!restoredData) return false;

      this.data = new Proxy<T>(JSON.parse(restoredData), this.dataHandler as ProxyHandler<T>);

      return true;
    } catch (error) {
      this.logger.error(error);

      return false;
    }
  }

  setCookie () {
    this.fastifyReply.setCookie(
      this.cookieConfig.name,
      this.sessionId,
      omit(this.cookieConfig, 'name')
    );
  }

  get redisKey () {
    return `${this.redisPrefix}:${this.sessionId}`;
  }
}
