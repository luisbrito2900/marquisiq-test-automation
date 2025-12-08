import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { EnrichPage } from '../pages/EnrichPage';
import { APP_CONFIG, TEST_DATA, TIMEOUTS } from '../utils/constants';

test.describe('Search Filter Tests', () => {
  test('Search Filtering by Master Customer Name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );

    await homePage.verifyWelcomeMessageVisible();
    await homePage.takeScreenshot('Home Page');

    await homePage.navigateToEnrichTab(1);
    await homePage.waitForEnrichApiLoad();
    await page.waitForTimeout(TIMEOUTS.MEDIUM);
    await enrichPage.takeScreenshot('Enrich Page');

    await enrichPage.searchByMasterCustomerName(
      TEST_DATA.MASTER_CUSTOMER_NAME,
      expect
    );
    await enrichPage.takeScreenshot('Search Results Displayed');
  });
  test('Search Filtering by Assigned Data Range', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const enrichPage = new EnrichPage(page);
    const startYear = '2022';
    const nextYear = '2025';

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );

    await homePage.verifyWelcomeMessageVisible();
    await homePage.takeScreenshot('Home Page');

    await homePage.navigateToEnrichTab(1);
    await homePage.waitForEnrichApiLoad();
    await page.waitForTimeout(TIMEOUTS.MEDIUM);
    await enrichPage.takeScreenshot('Enrich Page');

    await enrichPage.clickOnDataRangeButton();
    await enrichPage.takeScreenshot('Date Range Button Clicked');

    await enrichPage.selectDateRange('Years');

    await enrichPage.clickOnLastCheckbox();
    await enrichPage.clickOnNextCheckbox();
    await enrichPage.takeScreenshot('Last and Next Checkboxes Clicked');

    await enrichPage.fillLastField(startYear);
    await enrichPage.fillNextField(nextYear);
    await enrichPage.takeScreenshot('Last and Next Fields Filled');

    await enrichPage.filterByAssignedDateRange(startYear, nextYear, expect);

    await page.waitForTimeout(TIMEOUTS.MEDIUM);

    await enrichPage.takeScreenshot('Date Range Applied');
  });
});
