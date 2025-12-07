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
      'pwmochawesome',
      {
        outputJSON: true,
        outputFileName: 'mochawesome.json',
        generateHTML: true,
        reportDir: 'mochawesome-report',
        reportTitle: 'MarquisIQ Test Report',
        charts: true,
        inlineAssets: true,
        code: true,
      },
    ],
  ],
  use: {
    viewport: { width: 1920, height: 1080 },
    launchOptions: {
      args: ['--start-maximized'],
    },
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
