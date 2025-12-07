import { BasePage } from './BasePage';

/**
 * Page Object Model for Enrich Page
 */
export class EnrichPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      masterCustomerNameComboBox: 'combobox',
      masterCustomerNameLabel: 'Master Customer Name',
      searchButton: 'button',
      searchButtonName: 'Search',
    };
    this.apiEndpoints = {
      genericApi: '/generic/api/generic',
      customerWithMaster: 'vwCustomerWithMaster',
    };
  }

  /**
   * Get the Master Customer Name combobox locator
   * @returns {import('@playwright/test').Locator}
   */
  getMasterCustomerNameComboBox() {
    return this.page.getByRole('combobox', {
      name: this.selectors.masterCustomerNameLabel,
    });
  }

  /**
   * Verify Master Customer Name combobox is visible
   */
  async verifyMasterCustomerNameVisible() {
    const combobox = this.getMasterCustomerNameComboBox();
    await combobox.waitFor({ state: 'visible' });
  }

  /**
   * Fill Master Customer Name in the combobox
   * @param {string} customerName - The master customer name to search for
   */
  async fillMasterCustomerName(customerName) {
    const combobox = this.getMasterCustomerNameComboBox();
    await combobox.fill(customerName);
  }

  /**
   * Click the Search button
   */
  async clickSearch() {
    await this.page
      .getByRole('button', { name: this.selectors.searchButtonName })
      .click();
  }

  /**
   * Wait for search API response and validate results
   * @param {string} _expectedCustomerName - Expected master customer name in results (used for documentation)
   * @returns {Promise<Object>} The response body
   */
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

  /**
   * Validate that all results contain the expected master customer name
   * @param {Object} responseBody - The API response body
   * @param {string} expectedCustomerName - Expected master customer name
   * @param {import('@playwright/test').Expect} expect - Playwright expect instance
   */
  validateMasterCustomerFilter(responseBody, expectedCustomerName, expect) {
    expect(Array.isArray(responseBody.results)).toBeTruthy();

    for (const item of responseBody.results) {
      expect(item.MasterCustomerName).toBe(expectedCustomerName);
    }
  }

  /**
   * Perform complete search flow with validation
   * @param {string} customerName - Master customer name to search for
   * @param {import('@playwright/test').Expect} expect - Playwright expect instance
   */
  async searchByMasterCustomerName(customerName, expect) {
    await this.verifyMasterCustomerNameVisible();
    await this.fillMasterCustomerName(customerName);

    const responseBody = await this.searchAndWaitForResults(customerName);

    // Validate all results contain the expected customer name
    this.validateMasterCustomerFilter(responseBody, customerName, expect);
  }
}
