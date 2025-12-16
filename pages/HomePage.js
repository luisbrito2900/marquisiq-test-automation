import { BasePage } from './BasePage';
import { FilesTab } from './FilesTab';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      welcomeMessage: 'text=What do you want to know?',
      enrichTab: "//button[contains(text(), 'Enrich')]",
      exploreTab: "//button[contains(text(), 'Explore')]",
      analyzeTab: "//button[contains(text(), 'Analyze')]",
      filesTab: "//button[contains(text(), 'Files')]",
    };
  }
  getWelcomeMessage() {
    return this.page.getByText('What do you want to know?');
  }
  async verifyWelcomeMessageVisible() {
    await this.page
      .getByText('What do you want to know?')
      .waitFor({ state: 'visible' });
  }
  async navigateToEnrichTab() {
    await this.page.locator(this.selectors.enrichTab).click();
  }
  async waitForEnrichApiLoad() {
    await this.waitForApiSuccess('/generic/api/generic');
  }
  async clickOnExploreTab() {
    await this.page.locator(this.selectors.exploreTab).click();
    await this.waitForApiSuccess('/generic/api/generic');
  }
  async clickOnAnalyzeTab() {
    await this.page.locator(this.selectors.analyzeTab).click();
  }
  async clickOnFilesTab() {
    const filesPages = new FilesTab(this.page);

    await this.page.locator(this.selectors.filesTab).click();
    await filesPages.verifyFilesTabOpenSuccessfully();
  }
}
