import { expect, Locator, Page } from "@playwright/test";

export class ToursCampaigns {
    readonly page: Page;
    static readonly toursTab = 'button:has-text("Tours")';
    static readonly campaignsTab = 'button:has-text("Campaigns")';
    static readonly plannedCampaignsTab = 'button:has-text("Planned campaigns")';
    static readonly historyTab = 'button:has-text("History")';
    static readonly nameTab = '//span[contains(text(),"Name")]';
    static readonly relatedTourTab = '//span[contains(text(),"Related tour")]';
    static readonly typeTab = '//span[contains(text(),"Type")]';
    static readonly startDateTab = '//span[contains(text(),"Start date")]';
    static readonly assignedUserTab = '//span[contains(text(),"Assigned user")]';
    static readonly periodicityTab = '//span[contains(text(),"Periodicity")]';
    static readonly commentTab = '//span[contains(text(),"Comment")]';
    static readonly statusTab = '//span[contains(text(),"Status")]';

    static readonly paginationDrd = '//body/sixbm-root[1]/div[1]/main[1]/section[1]/div[2]/ng-component[1]/sixbm-content-section[1]/section[1]/div[1]/sixbm-panel[1]/div[1]/div[2]/sixbm-campaign-list[1]/div[2]/div[1]/sixbm-datatable-editable[1]/div[2]/ng-select[1]';

    static readonly campaignsSortAsc = '.datatable-header-cell.sortable.sort-active.sort-asc';
    static readonly campaignsSortDesc = '.datatable-header-cell.sortable.sort-active.sort-desc';

    constructor(page: Page) {
        this.page = page;
    }

    async changePagination() {
        await this.page.locator(ToursCampaigns.paginationDrd).click();
        await this.page.locator('span:has-text("20")').click();
    }
}
