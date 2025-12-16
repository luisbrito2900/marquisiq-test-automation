import { BasePage } from './BasePage';
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
  async navigateToLogin(baseUrl) {
    await this.goto(baseUrl);
  }
  async clickSignIn() {
    await this.page.getByText('Sign In').first().click();
  }
  async fillUsername(username) {
    await this.page.locator(this.selectors.usernameInput).fill(username);
  }
  async fillPassword(password) {
    await this.page.locator(this.selectors.passwordInput).waitFor();
    await this.page.locator(this.selectors.passwordInput).fill(password);
  }
  async clickSubmit() {
    await this.page.locator(this.selectors.submitButton).click();
  }
  async clickCancel() {
    await this.page.locator(this.selectors.cancelLink).waitFor();
    await this.page.locator(this.selectors.cancelLink).click();
  }
  async clickOtherTile() {
    await this.page.locator(this.selectors.otherTile).waitFor();
    await this.page.locator(this.selectors.otherTile).click();
  }
  async clickBack() {
    await this.page.locator(this.selectors.backButton).waitFor();
    await this.page.locator(this.selectors.backButton).click();
  }
  async login(username, password, baseUrl = 'https://sandbox.marquisiq.com/') {
    await this.navigateToLogin(baseUrl);
    await this.clickSignIn();

    await this.fillUsername(username);
    await this.clickSubmit();
    await this.fillPassword(password);
    await this.clickSubmit();

    const el = this.page.locator('#cancelLink');
    try {
      await el.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      await this.clickSubmit();
    }
    await this.page.waitForTimeout(2000);
    await this.clickCancel();

    await this.clickOtherTile();

    await this.fillUsername(username);
    await this.clickSubmit();
    await this.fillPassword(password);
    await this.clickSubmit();

    await this.fillPassword(password);
    await this.clickSubmit();

    await this.clickBack();

    await this.page.waitForTimeout(5000);
  }
}
