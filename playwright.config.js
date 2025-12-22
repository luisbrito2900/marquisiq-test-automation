import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: true,
        categories: [
          {
            name: 'Smoke Tests',
            matchedStatuses: ['failed', 'broken'],
          },
        ],
        environmentInfo: {
          framework: 'Playwright',
          node_version: process.version,
        },
      },
    ],
  ],
  use: {
    viewport: { width: 1920, height: 1080 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
