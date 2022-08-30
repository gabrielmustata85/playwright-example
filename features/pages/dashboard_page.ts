import { expect, Locator, Page } from "@playwright/test";

export class Dashboard {
    readonly page: Page;
    static readonly toursAndCampaignsBtn = '#measurement';
  
    constructor(page: Page) {
      this.page = page;
    }

}
