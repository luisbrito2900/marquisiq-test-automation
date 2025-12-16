import { BasePage } from './BasePage';
import { expect } from '@playwright/test';
export class EnrichPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      masterCustomerNameComboBox: 'combobox',
      masterCustomerNameLabel: 'Master Customer Name',
      searchButton: 'button',
      searchButtonName: 'Search',
      dataRangeBtn: "//span[text() = 'Assigned Date']/following::button[1]",
      dateRangeDropdownBase:
        "//div[@role='tablist']//button[normalize-space() = '",
      lastCheckbox:
        "//span[normalize-space()='Last']/preceding::input[@type='checkbox'][1]",
      nextCheckbox:
        "//span[normalize-space()='Next']/preceding::input[@type='checkbox'][1]",
      lastField: "//span[normalize-space()='Last']/following::input[1]",
      nextField: "//span[normalize-space()='Next']/following::input[1]",
      applyBtn: "//button[.='Apply']",
      dropDownOption: `input+[data-testid="ArrowDropDownIcon"]`,
    };
    this.apiEndpoints = {
      genericApi: '/generic/api/generic',
      customerWithMaster: 'vwCustomerWithMaster',
    };
  }

  getMasterCustomerNameComboBox() {
    return this.page.getByRole('combobox', {
      name: this.selectors.masterCustomerNameLabel,
    });
  }

  async verifyMasterCustomerNameVisible() {
    const combobox = this.getMasterCustomerNameComboBox();
    await combobox.waitFor({ state: 'visible' });
  }

  async fillMasterCustomerName(customerName) {
    const combobox = this.getMasterCustomerNameComboBox();
    await combobox.fill(customerName);
  }

  async clickSearch() {
    await this.page
      .getByRole('button', { name: this.selectors.searchButtonName })
      .click();
  }

  async searchAndWaitForResults(_customerName) {
    const [response] = await Promise.all([
      this.page.waitForResponse((res) => {
        return (
          res.url().includes(this.apiEndpoints.genericApi) &&
          res.url().includes(this.apiEndpoints.customerWithMaster) &&
          res.ok()
        );
      }),
      this.clickSearch(),
    ]);

    return await response.json();
  }

  validateMasterCustomerFilter(responseBody, expectedCustomerName, expect) {
    expect(Array.isArray(responseBody.results)).toBeTruthy();

    for (const item of responseBody.results) {
      expect(item.MasterCustomerName).toBe(expectedCustomerName);
    }
  }

  async searchByMasterCustomerName(customerName, expect) {
    await this.verifyMasterCustomerNameVisible();
    await this.fillMasterCustomerName(customerName);

    const responseBody = await this.searchAndWaitForResults(customerName);

    this.validateMasterCustomerFilter(responseBody, customerName, expect);
  }

  async clickOnDateRangeButton() {
    await this.page.locator(this.selectors.dataRangeBtn).click();
  }

  getDateRangeDropdownOption(dateRange) {
    return this.page.locator(
      `${this.selectors.dateRangeDropdownBase}${dateRange}']`
    );
  }

  async selectDateRange(dateRange) {
    const option = this.getDateRangeDropdownOption(dateRange);
    await option.click();
  }
  async clickOnLastCheckbox() {
    await this.page.locator(this.selectors.lastCheckbox).click();
  }
  async clickOnNextCheckbox() {
    await this.page.locator(this.selectors.nextCheckbox).click();
  }

  async fillLastField(value) {
    await this.page.locator(this.selectors.lastField).clear();
    await this.page.locator(this.selectors.lastField).fill(value);
  }

  async fillNextField(value) {
    await this.page.locator(this.selectors.nextField).clear();
    await this.page.locator(this.selectors.nextField).fill(value);
  }

  async clickOnApplyBtn() {
    await this.page.locator(this.selectors.applyBtn).click();
  }

  async applyDateRangeAndWaitForResults() {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (res) =>
          res.url().includes(this.apiEndpoints.genericApi) &&
          res.url().includes(this.apiEndpoints.customerWithMaster) &&
          res.ok()
      ),
      this.clickOnApplyBtn(),
    ]);

    const body = await response.json();
    return body;
  }

  validateAssignedDateRange(responseBody, startYear, endYear, expect) {
    expect(Array.isArray(responseBody.results)).toBe(true);

    const startDate = new Date(`${startYear}-01-01T00:00:00`);
    const endDate = new Date(`${endYear}-12-31T23:59:59`);

    const rowsWithDate = responseBody.results.filter(
      (item) => item.MasterCustomerAssignedDatetime
    );

    expect(rowsWithDate.length).toBeGreaterThan(0);

    for (const item of rowsWithDate) {
      const value = item.MasterCustomerAssignedDatetime;
      const date = new Date(value);

      expect(date.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
      expect(date.getTime()).toBeLessThanOrEqual(endDate.getTime());
    }
  }

  async filterByAssignedDateRange(startYear, endYear, expect) {
    const responseBody = await this.applyDateRangeAndWaitForResults();
    this.validateAssignedDateRange(responseBody, startYear, endYear, expect);
  }

  async selectOption() {
    await this.page.getByText('Assign', { exact: true }).click();
    await this.page.getByText('Maintain').click();
    await this.waitForApiSuccess(this.apiEndpoints.genericApi);
    await this.page.getByText('Maintain', { exact: true }).click();
    // await this.waitForApiSuccess(this.apiEndpoints.genericApi); // CHECK AGAIN
    await this.page.getByText('Configure').click();
    await expect(
      this.page.getByRole('button', { name: 'Delete' }).nth(0)
    ).toBeVisible();
  }
  async openMasterCustomerCriteriaDropdown(customerName) {
    const chip = this.page
      .locator('span')
      .filter({ hasText: customerName })
      .first();
    await chip.click();
  }
  async selectMasterCustomerCriteria(criteriaLabel) {
    await this.page.getByRole('menuitem', { name: criteriaLabel }).click();
  }
  async setMasterCustomerCriteria(customerName, criteriaLabel) {
    await this.openMasterCustomerCriteriaDropdown(customerName);
    await this.selectMasterCustomerCriteria(criteriaLabel);
  }
  getMasterCustomerQueryKey(criteriaLabel) {
    const map = {
      'Include Exact': 'MasterCustomerName_exact[]',
      'Include Contains': 'MasterCustomerName_contains[]',
      'Exclude Contains': 'MasterCustomerName_exclude[]',
      'Exclude Exact': 'MasterCustomerName_excludeExact[]',
    };

    const key = map[criteriaLabel];
    if (!key) throw new Error(`Unknown criteriaLabel: ${criteriaLabel}`);
    return key;
  }
  async setMasterCustomerCriteriaAndWaitForResults(
    customerName,
    criteriaLabel
  ) {
    const queryKey = this.getMasterCustomerQueryKey(criteriaLabel);

    const [response] = await Promise.all([
      this.page.waitForResponse((res) => {
        if (!res.url().includes(this.apiEndpoints.genericApi)) return false;
        if (!res.url().includes(this.apiEndpoints.customerWithMaster))
          return false;
        if (!res.ok()) return false;

        const url = new URL(res.url());
        const value = url.searchParams.get(queryKey);

        // ✅ asegura que sea el request del criterio actual
        return value === customerName;
      }),
      this.setMasterCustomerCriteria(customerName, criteriaLabel), // esto abre el dropdown y hace click en el criterio
    ]);

    return await response.json();
  }

  async validateExcludeContains(responseBody, excludedName, expect) {
    await expect(Array.isArray(responseBody.results)).toBeTruthy();

    for (const item of responseBody.results) {
      await expect(item.MasterCustomerName).not.toContain(excludedName);
    }
  }
  async validateIncludeContains(responseBody, expectedName, expect) {
    await expect(Array.isArray(responseBody.results)).toBeTruthy();

    for (const item of responseBody.results) {
      await expect(item.MasterCustomerName).toContain(expectedName);
    }
  }
  async validateExcludeExact(responseBody, excludedName, expect) {
    await expect(Array.isArray(responseBody.results)).toBeTruthy();

    for (const item of responseBody.results) {
      await expect(item.MasterCustomerName).not.toBe(excludedName);
    }
  }
}
