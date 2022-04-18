import { Page } from 'playwright';

export const getCodeParam = async (
  page: Page
) => {
  const code = await page.evaluate(() => (
    new URLSearchParams(window.location.search).get('code')
  ));

  return code;
};
