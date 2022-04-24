import { GithubMethod } from '../../src/lib/methods/Github';
import config from '../config';
import { getGithubCode } from '../utils/getGithubCode';
import { getMethodFunctions } from '../utils/getMethodTests';

const githubMethod = new GithubMethod(config.github);
let functions: ReturnType<typeof getMethodFunctions>;

beforeAll(async () => {
  const code = await getGithubCode(githubMethod.getAuthUrl());

  functions = getMethodFunctions(githubMethod, code);
});

it('A valid client is returned', () => functions['validClient']());
it('Client returns emails', () => functions['returnsEmail']());
it('Valid auth url is returned', () => functions['validUrl']());
