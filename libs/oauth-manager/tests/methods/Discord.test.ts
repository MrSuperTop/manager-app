import { DiscordMethod } from '../../src/lib/methods/Discord';
import config from '../config';
import { getDiscordCode } from '../utils/getDiscordCode';
import { getMethodFunctions } from '../utils/getMethodTests';

const discordMethod = new DiscordMethod(config.discord);
let functions: ReturnType<typeof getMethodFunctions>;

beforeAll(async () => {
  const code = await getDiscordCode(discordMethod.getAuthUrl());

  functions = getMethodFunctions(discordMethod, code);
});

it('A valid client is returned', () => functions['validClient']());
it('Client returns emails', () => functions['returnsEmail']());
it('Valid auth url is returned', () => functions['validUrl']());
