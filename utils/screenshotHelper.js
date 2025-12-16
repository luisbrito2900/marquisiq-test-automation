import { test } from '@playwright/test';

export async function takeScreenshot(page, name) {
  const screenshot = await page.screenshot();
  await test.info().attach(name, {
    body: screenshot,
    contentType: 'image/png',
  });
}
