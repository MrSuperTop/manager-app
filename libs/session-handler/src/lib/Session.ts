import Redis from 'ioredis';
import { FastifyReply } from 'fastify';
import { CookieConfig, SessionOptions } from './types/SessionOptions';
import { omit } from 'lodash';
import { SessionId } from './types/SessionId';

export class Session<T extends object> {
  protected redisPrefix: string;
  public id: SessionId;
  protected redis: Redis;
  protected fastifyReply: FastifyReply;
  protected cookieConfig: CookieConfig;

  public data: T;

  constructor (
    {
      redis,
      sessionId,
      reply,
      cookie
    }: SessionOptions,
    customData: T = Object()
  ) {
    this.redis = redis.client;
    this.redisPrefix = redis.prefix;
    this.id = sessionId;
    this.fastifyReply = reply;
    this.cookieConfig = cookie;

    this.data = customData;
  }

  get redisKey () {
    return `${this.redisPrefix}:${this.id}`;
  }

  async   load (): Promise<boolean> {
    try {
      const restoredData = await this.redis.get(
        this.redisKey
      );

      if (!restoredData) return false;

      this.data = JSON.parse(restoredData);

      return true;
    } catch (error) {
      return false;
    }
  }

  async save () {
    await this.redis.set(
      this.redisKey,
      JSON.stringify(this.data)
    );
  }

  setCookie () {
    this.fastifyReply.setCookie(
      this.cookieConfig.name,
      JSON.stringify(this.id),
      omit(this.cookieConfig, 'name')
    );

    return this;
  }

  clearCookie () {
    this.fastifyReply.clearCookie(
      this.cookieConfig.name,
      {
        path: this.cookieConfig.path
      }
    );
  }

  async destroy () {
    try {
      this.clearCookie();

      await this.redis.del(this.redisKey);
    } catch (error) {
      return false;
    }

    return true;
  }
}
