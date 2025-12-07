import { BasePage } from './BasePage';

/**
 * Page Object Model for Home Page
 */
export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      welcomeMessage: 'text=What do you want to know?',
      enrichTab: '[role="tablist"] > button',
    };
  }

  /**
   * Verify that the home page is loaded
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  getWelcomeMessage() {
    return this.page.getByText('What do you want to know?');
  }

  /**
   * Verify welcome message is visible
   */
  async verifyWelcomeMessageVisible() {
    await this.page.getByText('What do you want to know?').waitFor({ state: 'visible' });
  }

  /**
   * Navigate to Enrich tab
   * @param {number} tabIndex - Index of the tab (default: 1 for Enrich)
   */
  async navigateToEnrichTab(tabIndex = 1) {
    await this.page.locator(this.selectors.enrichTab).nth(tabIndex).click();
  }

  /**
   * Wait for Enrich API to load successfully
   */
  async waitForEnrichApiLoad() {
    await this.waitForApiSuccess('/generic/api/generic');
  }
}

