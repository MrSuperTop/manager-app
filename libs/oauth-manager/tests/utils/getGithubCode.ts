import { chromium } from 'playwright';
import { getCodeParam } from './getCodeParam';
import { loadContext } from './loadContext';

export const getGithubCode = async (
  authUrl: string
) => {
  const browser = await chromium.launch({
    headless: true
  });

  const context = await loadContext('github', browser);
  const page = await context.newPage();

  await page.goto(authUrl);

  if (await page.isVisible('#js-oauth-authorize-btn')) {
    await page.waitForTimeout(2000);
    await page.click('#js-oauth-authorize-btn');
}

  await page.waitForTimeout(100);

  const code = await getCodeParam(page);

  await browser.close();

  return code;
};
