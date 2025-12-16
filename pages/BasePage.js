import { takeScreenshot } from '../utils/screenshotHelper';
export class BasePage {
  constructor(page) {
    this.page = page;
  }
  async goto(url) {
    await this.page.goto(url);
  }
  async waitForElement(locator) {
    await locator.waitFor({ state: 'visible' });
  }
  async takeScreenshot(name) {
    await takeScreenshot(this.page, name);
  }
  async waitForResponse(predicate) {
    return await this.page.waitForResponse(predicate);
  }
  async waitForApiSuccess(partialUrl) {
    return await this.waitForResponse(
      (response) => response.url().includes(partialUrl) && response.ok()
    );
  }
}
