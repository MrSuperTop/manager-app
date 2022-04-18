import config from '../../../../../config';
import { OAuthManager } from '../../../../../utils/OAuthManager';
import { prisma } from '../../../../../plugins/prisma';
import { redis } from '../../../../../plugins/redis';
import { DiscordMethod, GithubMethod, GoogleMethod } from '@nx-manager-app/oauth-manager';

export const manager = new OAuthManager({
  redis,
  prisma
});

manager.use(new GithubMethod(config.oauth.github));
manager.use(new GoogleMethod(config.oauth.google));
manager.use(new DiscordMethod(config.oauth.discord));
