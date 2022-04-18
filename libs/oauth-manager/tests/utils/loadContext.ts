import { join } from 'path';
import { Browser } from 'playwright';
import { sites } from '../config';

export const loadContext = async (
  site: typeof sites[number],
  browser: Browser
) => {
  const contextPath = join(__filename, `../../config/states/${site}.json`);
  const context = await browser.newContext({ storageState: contextPath });

  return context;
};
