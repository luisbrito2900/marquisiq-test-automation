import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class FilesTab extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      downloadButton: 'button:has-text("Download")',
      filesHeading: 'h5:has-text("Files")',
    };
  }
  async verifyFilesTabOpenSuccessfully() {
    await expect(this.page.locator(this.selectors.filesHeading)).toBeVisible();
  }
}
