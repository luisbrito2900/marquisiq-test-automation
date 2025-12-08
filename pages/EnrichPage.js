import { BasePage } from './BasePage';
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

  async searchAndWaitForResults(_expectedCustomerName) {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (res) =>
          res.url().includes(this.apiEndpoints.genericApi) &&
          res.url().includes(this.apiEndpoints.customerWithMaster) &&
          res.ok()
      ),
      this.clickSearch(),
    ]);

    const body = await response.json();
    return body;
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

  async clickOnDataRangeButton() {
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
}
