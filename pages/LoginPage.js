import { BasePage } from './BasePage';

/**
 * Page Object Model for Login functionality
 */
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      signInButton: 'text=Sign In',
      usernameInput: '[name="loginfmt"]',
      passwordInput: '[name="passwd"]',
      submitButton: '[data-report-value="Submit"]',
      cancelLink: '#cancelLink',
      otherTile: '#otherTile',
      backButton: '#idBtn_Back',
    };
  }

  /**
   * Navigate to the application login page
   * @param {string} baseUrl - Base URL of the application
   */
  async navigateToLogin(baseUrl) {
    await this.goto(baseUrl);
  }

  /**
   * Click on the Sign In button
   */
  async clickSignIn() {
    await this.page.getByText('Sign In').first().click();
  }

  /**
   * Fill username in the login form
   * @param {string} username - Username to enter
   */
  async fillUsername(username) {
    await this.page.locator(this.selectors.usernameInput).fill(username);
  }

  /**
   * Fill password in the login form
   * @param {string} password - Password to enter
   */
  async fillPassword(password) {
    await this.page.locator(this.selectors.passwordInput).waitFor();
    await this.page.locator(this.selectors.passwordInput).fill(password);
  }

  /**
   * Click the submit button
   */
  async clickSubmit() {
    await this.page.locator(this.selectors.submitButton).click();
  }

  /**
   * Click the cancel link
   */
  async clickCancel() {
    await this.page.locator(this.selectors.cancelLink).waitFor();
    await this.page.locator(this.selectors.cancelLink).click();
  }

  /**
   * Click the "Other" tile option
   */
  async clickOtherTile() {
    await this.page.locator(this.selectors.otherTile).waitFor();
    await this.page.locator(this.selectors.otherTile).click();
  }

  /**
   * Click the back button
   */
  async clickBack() {
    await this.page.locator(this.selectors.backButton).waitFor();
    await this.page.locator(this.selectors.backButton).click();
  }

  /**
   * Complete the full login flow
   * @param {string} username - Username to login
   * @param {string} password - Password to login
   * @param {string} baseUrl - Base URL of the application
   */
  async login(username, password, baseUrl = 'https://sandbox.marquisiq.com/') {
    await this.navigateToLogin(baseUrl);
    await this.clickSignIn();
    
    // First login attempt
    await this.fillUsername(username);
    await this.clickSubmit();
    await this.fillPassword(password);
    await this.clickSubmit();
    
    // Wait for cancel link and click it
    await this.page.waitForTimeout(2000);
    await this.clickCancel();

    // Click "Other" tile
    await this.clickOtherTile();

    // Second login attempt
    await this.fillUsername(username);
    await this.clickSubmit();
    await this.fillPassword(password);
    await this.clickSubmit();

    // Additional password submission (if required by the flow)
    await this.fillPassword(password);
    await this.clickSubmit();

    // Click back button
    await this.clickBack();

    // Wait for navigation to complete
    await this.page.waitForTimeout(5000);
  }
}

