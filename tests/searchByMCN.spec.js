import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { EnrichPage } from '../pages/EnrichPage';
import { APP_CONFIG, TEST_DATA, TIMEOUTS } from '../utils/constants';

test.describe('Master Customer Name Search', () => {
  test('Search Filtering by Master Customer Name', async ({ page }) => {
    // Initialize Page Objects
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const enrichPage = new EnrichPage(page);

    // Step 1: Login to the application
    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );

    // Step 2: Verify home page is loaded and take screenshot
    await homePage.verifyWelcomeMessageVisible();
    await homePage.takeScreenshot('Home Page');

    // Step 3: Navigate to Enrich tab
    await homePage.navigateToEnrichTab(1);
    await homePage.waitForEnrichApiLoad();
    await page.waitForTimeout(TIMEOUTS.MEDIUM); // TODO: Replace with proper wait condition
    await enrichPage.takeScreenshot('Enrich Page');

    // Step 4: Search by Master Customer Name
    await enrichPage.searchByMasterCustomerName(
      TEST_DATA.MASTER_CUSTOMER_NAME,
      expect
    );
    await enrichPage.takeScreenshot('Search Results Displayed');
  });
});
