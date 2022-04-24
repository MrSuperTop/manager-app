import { Page } from 'playwright';

export const getCodeParam = async (
  page: Page
) => {
  const code = await page.evaluate(() => (
    new URLSearchParams(window.location.search).get('code')
  ));

  if (!code) {
    throw new Error('Wasn\'t able to retrieve "code" param from query string');
  }

  return code;
};
