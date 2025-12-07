import { test } from '@playwright/test';

/**
 * Takes a screenshot and attaches it to the test report
 * @param {import('@playwright/test').Page} page - Playwright page instance
 * @param {string} name - Name for the screenshot attachment
 */
export async function takeScreenshot(page, name) {
  const screenshot = await page.screenshot();
  await test.info().attach(name, {
    body: screenshot,
    contentType: 'image/png',
  });
}
