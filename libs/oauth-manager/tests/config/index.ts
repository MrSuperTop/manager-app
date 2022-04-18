import { readFileSync } from 'fs';
import { GithubMethodOptions } from '../../src/lib/methods/Github';
import { resolve } from 'path';
import { parse } from 'yaml';
import { GoogleMethodOptions } from '../../src/lib/methods/Google';
import { DiscordMethodOptions } from '../../src/lib/methods/Discord';

export const sites = ['github', 'google', 'discord'] as const;

interface Config {
  github: GithubMethodOptions,
  google: GoogleMethodOptions,
  discord: DiscordMethodOptions
}

const file = readFileSync(resolve(__filename, '../test.yml')).toString();
const config: Config = parse(file);

export default config;
