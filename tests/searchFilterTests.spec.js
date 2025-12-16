import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { EnrichPage } from '../pages/EnrichPage';
import { APP_CONFIG, TEST_DATA, TIMEOUTS } from '../utils/constants';

test.describe('Smoke Tests', () => {
  // test('Search Filtering by Master Customer Name', async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   const homePage = new HomePage(page);
  //   const enrichPage = new EnrichPage(page);
  //   await loginPage.login(
  //     TEST_DATA.CREDENTIALS.USERNAME,
  //     TEST_DATA.CREDENTIALS.PASSWORD,
  //     APP_CONFIG.BASE_URL
  //   );
  //   await homePage.verifyWelcomeMessageVisible();
  //   await homePage.takeScreenshot('Home Page');
  //   await homePage.navigateToEnrichTab(1);
  //   await homePage.waitForEnrichApiLoad();
  //   await page.waitForTimeout(TIMEOUTS.MEDIUM);
  //   await enrichPage.takeScreenshot('Enrich Page');

  //   await enrichPage.searchByMasterCustomerName(
  //     TEST_DATA.MASTER_CUSTOMER_NAME,
  //     expect
  //   );
  //   await enrichPage.takeScreenshot('Search Results Displayed');
  // });
  // test('Search Filtering by Assigned Date Range', async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   const homePage = new HomePage(page);
  //   const enrichPage = new EnrichPage(page);
  //   const startYear = '2022';
  //   const nextYear = '2025';

  //   await loginPage.login(
  //     TEST_DATA.CREDENTIALS.USERNAME,
  //     TEST_DATA.CREDENTIALS.PASSWORD,
  //     APP_CONFIG.BASE_URL
  //   );

  //   await homePage.verifyWelcomeMessageVisible();
  //   await homePage.takeScreenshot('Home Page');

  //   await homePage.navigateToEnrichTab(1);
  //   await homePage.waitForEnrichApiLoad();
  //   await page.waitForTimeout(TIMEOUTS.MEDIUM);
  //   await enrichPage.takeScreenshot('Enrich Page');

  //   await enrichPage.clickOnDateRangeButton();
  //   await enrichPage.takeScreenshot('Date Range Button Clicked');

  //   await enrichPage.selectDateRange('Years');

  //   await enrichPage.clickOnLastCheckbox();
  //   await enrichPage.clickOnNextCheckbox();
  //   await enrichPage.takeScreenshot('Last and Next Checkboxes Clicked');

  //   await enrichPage.fillLastField(startYear);
  //   await enrichPage.fillNextField(nextYear);
  //   await enrichPage.takeScreenshot('Last and Next Fields Filled');

  //   await enrichPage.filterByAssignedDateRange(startYear, nextYear, expect);

  //   await page.waitForTimeout(TIMEOUTS.MEDIUM);

  //   await enrichPage.takeScreenshot('Date Range Applied');
  // });
  test('Verify User Login Functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
  });

  // test('Verify a user associated to multiple accounts', async ({ page }) => {});

  test('Verify Menu Navigation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
    await homePage.navigateToEnrichTab();
    await homePage.clickOnExploreTab();
    await homePage.clickOnAnalyzeTab(); // CHECK LATER
    await homePage.clickOnFilesTab();
  });
  test('Verify Sub Menu Navigation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
    await homePage.navigateToEnrichTab();
    await enrichPage.selectOption();
  });
  test('Verify a user can search functionality (sidebar)', async ({ page }) => {
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
  test('Verify user can exclude/Include values via sidebar', async ({
    page,
  }) => {
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
    await enrichPage.fillMasterCustomerName(TEST_DATA.MASTER_CUSTOMER_NAME);
    await enrichPage.clickSearch();

    let body = await enrichPage.setMasterCustomerCriteriaAndWaitForResults(
      TEST_DATA.MASTER_CUSTOMER_NAME,
      'Include Exact'
    );
    enrichPage.validateMasterCustomerFilter(
      body,
      TEST_DATA.MASTER_CUSTOMER_NAME,
      expect
    );

    // 2) Include Contains
    body = await enrichPage.setMasterCustomerCriteriaAndWaitForResults(
      TEST_DATA.MASTER_CUSTOMER_NAME,
      'Include Contains'
    );
    await enrichPage.validateIncludeContains(
      body,
      TEST_DATA.MASTER_CUSTOMER_NAME,
      expect
    );

    // 3) Exclude Contains
    body = await enrichPage.setMasterCustomerCriteriaAndWaitForResults(
      TEST_DATA.MASTER_CUSTOMER_NAME,
      'Exclude Contains'
    );
    await enrichPage.validateExcludeContains(
      body,
      TEST_DATA.MASTER_CUSTOMER_NAME,
      expect
    );

    // 4) Exclude Exact
    body = await enrichPage.setMasterCustomerCriteriaAndWaitForResults(
      TEST_DATA.MASTER_CUSTOMER_NAME,
      'Exclude Exact'
    );
    await enrichPage.validateExcludeExact(
      body,
      TEST_DATA.MASTER_CUSTOMER_NAME,
      expect
    );

    await page.waitForTimeout(TIMEOUTS.MEDIUM);
    await enrichPage.takeScreenshot('Search Results Displayed');
  });
  test.only('Verify user can select a date via relative date functionality', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const enrichPage = new EnrichPage(page);
    // const startYear = '2022';
    // const nextYear = '2025';

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

    await enrichPage.clickOnDateRangeButton();
    await enrichPage.takeScreenshot('Date Range Button Clicked');

    await page.getByRole('textbox', { name: 'Start' }).click();
    await page
      .locator(
        "button[class='MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd MuiIconButton-sizeMedium MuiPickersArrowSwitcher-button MuiPickersArrowSwitcher-previousIconButton css-1yu0c47'] svg"
      )
      .click();
    await page.locator('button').filter({ hasText: '20' }).first().click();
    await page.locator('button').filter({ hasText: '20' }).last().click();
    await enrichPage.clickOnApplyBtn();
    await page.waitForTimeout(TIMEOUTS.MEDIUM);

    // await enrichPage.selectDateRange('Years');

    // await enrichPage.clickOnLastCheckbox();
    // await enrichPage.clickOnNextCheckbox();
    // await enrichPage.takeScreenshot('Last and Next Checkboxes Clicked');

    // await enrichPage.fillLastField(startYear);
    // await enrichPage.fillNextField(nextYear);
    // await enrichPage.takeScreenshot('Last and Next Fields Filled');

    // await enrichPage.filterByAssignedDateRange(startYear, nextYear, expect);

    // await page.waitForTimeout(TIMEOUTS.MEDIUM);

    // await enrichPage.takeScreenshot('Date Range Applied');
  });
  test('Verify user can exclude/include values via in grid selection', async ({
    page,
  }) => {});
  test('Verify user can search using Advanced Filters', async ({ page }) => {});
  test('Verify a user can create a Master Customer/Assign', async ({
    page,
  }) => {});
  test('Verify a user can edit an existing Master Customer (Assign)', async ({
    page,
  }) => {});
  test('Verify a user can edit an existing Master Customer (Maintain)', async ({
    page,
  }) => {});
  test('Verify a user can assign a Master Customer (Bulk Edit)', async ({
    page,
  }) => {});
  test('Verify user RESET a customer from a Master Customer (Bulk Edit)', async ({
    page,
  }) => {});
  test('Verify user can reassign a Master Customer via In Grid edit', async ({
    page,
  }) => {});
  test('Verify a user can create Segment values', async ({ page }) => {});
  test('Verify a user can edit existing Segment values', async ({
    page,
  }) => {});
  test('Verify a user can delete an existing Segment value', async ({
    page,
  }) => {});
  test('Verify a user can update a Family Name', async ({ page }) => {});
  test('Verify a user can revert Family name value to automatic value', async ({
    page,
  }) => {});
  test('Verify a user can make in grid edits', async ({ page }) => {});
  test('Verify a user can make bulk edits', async ({ page }) => {});
  test('Verify a user can hide/add Segments', async ({ page }) => {});
  test('Verify user can manage columns', async ({ page }) => {});
  test('Verify user can view Tableau dashboard via ANALYZE menu', async ({
    page,
  }) => {});
  test('Verify user can download files', async ({ page }) => {});
  test('Verify user can upload a new file', async ({ page }) => {});
});
