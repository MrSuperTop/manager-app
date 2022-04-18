import { firefox } from 'playwright';
import { getCodeParam } from './getCodeParam';
import { loadContext } from './loadContext';

export const getGoogleCode = async (
  authUrl: string
) => {
  const browser = await firefox.launch({
    headless: true
  });

  const context = await loadContext('google', browser);
  const page = await context.newPage();

  await page.goto(authUrl);

  await page.click('div.lCoei.YZVTmd');
  await page.click('.ksBjEc > span:nth-child(4)');
  await page.click('#submit_approve_access > div:nth-child(1) > button:nth-child(1)');

  await page.waitForTimeout(750);
  
  const code = await getCodeParam(page);

  await browser.close();

  return code;
};