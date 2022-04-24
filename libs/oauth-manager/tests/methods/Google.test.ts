import { GoogleMethod } from '../../src/lib/methods/Google';
import config from '../config';
import { getGoogleCode } from '../utils/getGoogleCode';
import { getMethodFunctions } from '../utils/getMethodTests';

const googleMethod = new GoogleMethod(config.google);
let functions: ReturnType<typeof getMethodFunctions>;

beforeAll(async () => {
  const code = await getGoogleCode(googleMethod.getAuthUrl());

  functions = getMethodFunctions(googleMethod, code);
});

it('A valid client is returned', () => functions['validClient']());
it('Client returns emails', () => functions['returnsEmail']());
it('Valid auth url is returned', () => functions['validUrl']());
