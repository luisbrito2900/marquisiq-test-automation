import { takeScreenshot } from '../utils/screenshotHelper';

/**
 * Base Page Object Model class
 * Provides common functionality for all page objects
 */
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for an element to be visible
   * @param {import('@playwright/test').Locator} locator - The locator to wait for
   */
  async waitForElement(locator) {
    await locator.waitFor({ state: 'visible' });
  }

  /**
   * Take a screenshot and attach it to the test report
   * @param {string} name - Name for the screenshot
   */
  async takeScreenshot(name) {
    await takeScreenshot(this.page, name);
  }

  /**
   * Wait for a network response matching the criteria
   * @param {Function} predicate - Function to match the response
   * @returns {Promise<import('@playwright/test').Response>}
   */
  async waitForResponse(predicate) {
    return await this.page.waitForResponse(predicate);
  }

  async waitForApiSuccess(partialUrl) {
    return await this.waitForResponse(
      (response) => response.url().includes(partialUrl) && response.ok()
    );
  }
}
