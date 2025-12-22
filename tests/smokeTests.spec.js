import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { EnrichPage } from '../pages/EnrichPage';
import { APP_CONFIG, TEST_DATA, TIMEOUTS } from '../utils/constants';

const newMasterCustomerName = 'EDIT TEST';

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
  // WORK ON IT
  test.skip('Verify a user associated to multiple accounts', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
  });

  test.skip('Verify Menu Navigation', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
  });
  test.skip('Verify Sub Menu Navigation', async ({ page }) => {
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
  test.skip('Verify a user can search functionality (sidebar)', async ({ page }) => {
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

  // NEEDS TO BE REWORKED SINCE UI HAS CHANGED
  test.skip('Verify user can exclude/Include values via sidebar', async ({
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
    // await enrichPage.fillMasterCustomerName(TEST_DATA.MASTER_CUSTOMER_NAME);
    // await enrichPage.clickSearch();

    // let body = await enrichPage.setMasterCustomerCriteriaAndWaitForResults(
    //   TEST_DATA.MASTER_CUSTOMER_NAME,
    //   'Include Exact'
    // );
    // enrichPage.validateMasterCustomerFilter(
    //   body,
    //   TEST_DATA.MASTER_CUSTOMER_NAME,
    //   expect
    // );

    // // 2) Include Contains
    // body = await enrichPage.setMasterCustomerCriteriaAndWaitForResults(
    //   TEST_DATA.MASTER_CUSTOMER_NAME,
    //   'Include Contains'
    // );
    // await enrichPage.validateIncludeContains(
    //   body,
    //   TEST_DATA.MASTER_CUSTOMER_NAME,
    //   expect
    // );

    // // 3) Exclude Contains
    // body = await enrichPage.setMasterCustomerCriteriaAndWaitForResults(
    //   TEST_DATA.MASTER_CUSTOMER_NAME,
    //   'Exclude Contains'
    // );
    // await enrichPage.validateExcludeContains(
    //   body,
    //   TEST_DATA.MASTER_CUSTOMER_NAME,
    //   expect
    // );

    // // 4) Exclude Exact
    // body = await enrichPage.setMasterCustomerCriteriaAndWaitForResults(
    //   TEST_DATA.MASTER_CUSTOMER_NAME,
    //   'Exclude Exact'
    // );
    // await enrichPage.validateExcludeExact(
    //   body,
    //   TEST_DATA.MASTER_CUSTOMER_NAME,
    //   expect
    // );

    // await page.waitForTimeout(TIMEOUTS.MEDIUM);
    // await enrichPage.takeScreenshot('Search Results Displayed');
  });
  test.skip('Verify user can select a date via relative date functionality', async ({
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
    await enrichPage.applyAssignedDateRangeAndValidate(
      {
        after: '2025-11-20',
        before: '2025-12-20',
      },
      expect
    );
  });
  // NEEDS TO BE REWORKED SINCE UI HAS CHANGED
  test.skip('Verify user can exclude/include values via in grid selection', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    // const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );

    await homePage.verifyWelcomeMessageVisible();
    await homePage.takeScreenshot('Home Page');
    await homePage.navigateToEnrichTab(1);
    await homePage.waitForEnrichApiLoad();

    // const menuBtn = page
    //   .locator('[data-field="MasterCustomerName"] p + button')
    //   .first();

    // await menuBtn.scrollIntoViewIfNeeded();
    // await menuBtn.click({ timeout: 30000, force: true });
    // await page.waitForTimeout(TIMEOUTS.MEDIUM);

    // const includeExact =
    //   await enrichPage.setMasterCustomerGridCriteriaAndWaitForResults(
    //     'Include Exact'
    //   );
    // enrichPage.validateMasterCustomerFilter(
    //   includeExact.body,
    //   includeExact.customerName,
    //   expect
    // );

    // const includeContains =
    //   await enrichPage.setMasterCustomerGridCriteriaAndWaitForResults(
    //     'Include Contains'
    //   );
    // await enrichPage.validateIncludeContains(
    //   includeContains.body,
    //   includeContains.customerName,
    //   expect
    // );

    // const excludeContains =
    //   await enrichPage.setMasterCustomerGridCriteriaAndWaitForResults(
    //     'Exclude Contains'
    //   );
    // await enrichPage.validateExcludeContains(
    //   excludeContains.body,
    //   excludeContains.customerName,
    //   expect
    // );

    // const excludeExact =
    //   await enrichPage.setMasterCustomerGridCriteriaAndWaitForResults(
    //     'Exclude Exact'
    //   );
    // await enrichPage.validateExcludeExact(
    //   excludeExact.body,
    //   excludeExact.customerName,
    //   expect
    // );
  });
  test.skip('Verify user can search using Advanced Filters', async ({ page }) => {
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
    await enrichPage.takeScreenshot('Enrich Page');
    await page.getByText('Advanced Filters').click();
    await page.locator('label+div > div[role="combobox"]').click();
    await page
      .locator('ul > li[data-value]')
      .filter({ hasText: 'Master Customer Name' })
      .click();
    await page
      .locator('[aria-modal="true"] div > input[role="combobox"]')
      .fill(TEST_DATA.MASTER_CUSTOMER_NAME);
    await enrichPage.searchByMasterCustomerName(
      TEST_DATA.MASTER_CUSTOMER_NAME,
      expect,
      {
        updateAction: true,
        queryParam: {
          key: ['MasterCustomerName_exact[]', 'MasterCustomerName_contains[]'],
          value: TEST_DATA.MASTER_CUSTOMER_NAME,
        },
      }
    );
  });
  test('Verify a user can create a Master Customer/Assign', async ({
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
    await enrichPage.takeScreenshot('Enrich Page');
    await page.getByRole('button', { name: 'Add' }).click();
    await page
      .getByRole('textbox', { name: 'Master Customer Name' })
      .fill(newMasterCustomerName);
    await page.getByRole('combobox', { name: 'Segment 6' }).fill('6');
    await page.getByRole('option').click();
    await page.getByRole('combobox', { name: 'Segment777700' }).fill('7');
    await page.getByRole('option').click();
    await page.getByRole('combobox', { name: 'Segment8' }).fill('Blue');
    await page.getByRole('option').click();
    await enrichPage.verifyMasterCustomerWasAddedSuccessfully(
      newMasterCustomerName,
      expect
    );
    await expect(page.getByText('Success', { exact: true })).toBeVisible();
  });
  test.skip('Verify a user can edit an existing Master Customer (Assign)', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const enrichPage = new EnrichPage(page);
    const editMasterCustomerName = 'test33';

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );

    await homePage.verifyWelcomeMessageVisible();
    await homePage.takeScreenshot('Home Page');
    await homePage.navigateToEnrichTab(1);
    await homePage.waitForEnrichApiLoad();
    await enrichPage.takeScreenshot('Enrich Page');
    await page
      .locator(
        'input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-1v0myb8:visible'
      )
      .fill(editMasterCustomerName);
    await page
      .getByText(`${editMasterCustomerName} (1)`, { exact: true })
      .click();
    await page.locator(':text("Edit")').click();
    await enrichPage.selectDifferentSegmentValue('Segment8');
    await enrichPage.verifyMasterCustomerWasEditedSuccessfully(
      editMasterCustomerName,
      expect
    );
    await expect(page.getByText('Success', { exact: true })).toBeVisible();
    // await page.waitForTimeout(TIMEOUTS.MEDIUM);
  });
  test.skip('Verify a user can edit an existing Master Customer (Maintain)', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const enrichPage = new EnrichPage(page);
    const editMasterCustomerName = 'test33';

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );

    await homePage.verifyWelcomeMessageVisible();
    await homePage.takeScreenshot('Home Page');
    await homePage.navigateToEnrichTab(1);
    await homePage.waitForEnrichApiLoad();
    await enrichPage.takeScreenshot('Enrich Page');
    await page
      .locator(
        'input.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedEnd.MuiAutocomplete-input.MuiAutocomplete-inputFocused.css-1v0myb8:visible'
      )
      .fill(editMasterCustomerName);
    await page
      .getByText(`${editMasterCustomerName} (1)`, { exact: true })
      .click();
    await page.locator(':text("Edit")').click();
    await enrichPage.selectDifferentSegmentValue('Segment8');
    await enrichPage.verifyMasterCustomerWasEditedSuccessfully(
      editMasterCustomerName,
      expect
    );
    await expect(page.getByText('Success', { exact: true })).toBeVisible();
    // await page.waitForTimeout(TIMEOUTS.MEDIUM);
  });
  test.skip('Verify a user can assign a Master Customer (Bulk Edit)', async ({
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
    await enrichPage.takeScreenshot('Enrich Page');
  });
  test.skip('Verify user RESET a customer from a Master Customer (Bulk Edit)', async ({
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
    await enrichPage.takeScreenshot('Enrich Page');
  });
  test.skip('Verify user can reassign a Master Customer record via In Grid edit', async ({
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
    await enrichPage.takeScreenshot('Enrich Page');
  });
  test.skip('Verify user can reassign a Master Customer via In Grid edit', async ({
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
    await enrichPage.takeScreenshot('Enrich Page');
  });
  test.skip('Verify user can reset a Master Customer records via In Grid edit', async ({
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
    await enrichPage.takeScreenshot('Enrich Page');
  });
  test.skip('Verify a user can create Segment values', async ({ page }) => {
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
    await enrichPage.takeScreenshot('Enrich Page');
    await page.getByText('Assign', { exact: true }).click();
    await page.locator('li:has-text("Configure")').click();
    await page
      .getByRole('textbox', { name: 'New Salesforce Account' })
      .fill('Samsung');
    await enrichPage.takeScreenshot('New Segment Value Filled');
    await page.locator('button').filter({ hasText: 'Add' }).nth(1).click();
    await expect(page.getByText('Samsung', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(
      page.getByText('Records saved successfully.', { exact: true })
    ).toBeVisible();
    await page.waitForTimeout(TIMEOUTS.MEDIUM);
    await enrichPage.takeScreenshot('Segment Value Added');
    const row = page.locator('li.MuiListItem-root', {
      has: page.locator('span', { hasText: 'Samsung' }),
    });
    await row.locator('button[aria-label="Delete"]').click();
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await page.waitForTimeout(TIMEOUTS.MEDIUM);
  });
  test('Verify a user can edit existing Segment values', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // const homePage = new HomePage(page);
    // const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
    ///////////////////////////////////////////////////////////////////////////
    // await homePage.verifyWelcomeMessageVisible();
    // await homePage.takeScreenshot('Home Page');
    // await homePage.navigateToEnrichTab(1);
    // await homePage.waitForEnrichApiLoad();

    // await enrichPage.takeScreenshot('Enrich Page');
    // await page.getByText('Assign', { exact: true }).click();
    // await page.locator('li:has-text("Configure")').click();
    // await page
    //   .getByRole('textbox', { name: 'New Salesforce Account' })
    //   .fill('Samsung');
    // await enrichPage.takeScreenshot('New Segment Value Filled');
    // await page.locator('button').filter({ hasText: 'Add' }).nth(1).click();
    // await expect(page.getByText('Samsung', { exact: true })).toBeVisible();
    // await page.getByRole('button', { name: 'Save Changes' }).click();
    // await expect(
    //   page.getByText('Records saved successfully.', { exact: true })
    // ).toBeVisible();
    // await enrichPage.takeScreenshot('Segment Value Added');
    // await page.waitForTimeout(TIMEOUTS.MEDIUM);
    // const row1 = page.locator('li.MuiListItem-root', {
    //   has: page.locator('span', { hasText: 'Samsung' }),
    // });
    // await row1.locator('button[aria-label="Edit"]').click();
    ///////////////////////////////////////////////////////////////////////////

    // keep working the edit flow here

    // Delete the added value to keep the test idempotent

    // const row2 = page.locator('li.MuiListItem-root', {
    //   has: page.locator('span', { hasText: 'Samsung' }),
    // });
    // await row2.locator('button[aria-label="Delete"]').click();
    // await page.getByRole('button', { name: 'Save Changes' }).click();
    // await page.waitForTimeout(TIMEOUTS.MEDIUM);
  });

  //page.getByText('Records saved successfully.', { exact: true })
  test.skip('Verify a user can delete an existing Segment value', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    // const homePage = new HomePage(page);
    // const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
  });
  test.skip('Verify a user can update a Family Name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // const homePage = new HomePage(page);
    // const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
  });
  test.skip('Verify a user can revert Family name value to automatic value', async () => {});
  test.skip('Verify a user can make in grid edits', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // const homePage = new HomePage(page);
    // const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
  });
  test.skip('Verify a user can make bulk edits', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // const homePage = new HomePage(page);
    // const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
  });
  test.skip('Verify a user can hide/add Segments', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // const homePage = new HomePage(page);
    // const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
  });
  test.skip('Verify user can manage columns', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // const homePage = new HomePage(page);
    // const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
  });
  test.skip('Verify user can view Tableau dashboard via ANALYZE menu', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    // const homePage = new HomePage(page);
    // const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
  });
  test.skip('Verify user can download files', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // const homePage = new HomePage(page);
    // const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
  });
  test.skip('Verify user can upload a new file', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // const homePage = new HomePage(page);
    // const enrichPage = new EnrichPage(page);

    await loginPage.login(
      TEST_DATA.CREDENTIALS.USERNAME,
      TEST_DATA.CREDENTIALS.PASSWORD,
      APP_CONFIG.BASE_URL
    );
  });
});
