import { chromium } from 'playwright';
import { getCodeParam } from './getCodeParam';
import { loadContext } from './loadContext';

export const getDiscordCode = async (
  authUrl: string
) => {
  const browser = await chromium.launch();

  const context = await loadContext('discord', browser);
  const page = await context.newPage();

  await page.goto(authUrl);
  await page.click('button.button-f2h6uQ.lookFilled-yCfaCM');

  await page.waitForTimeout(500);
  
  const code = await getCodeParam(page);

  await browser.close();

  return code;
};
