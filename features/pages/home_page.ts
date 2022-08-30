import { expect, Locator, Page } from '@playwright/test';

export class Home {

    readonly page: Page;
    static readonly myProjectsButton = '#my-projects-button'
		static readonly projectDropdown = '[labelforid="my-project-dropdown"]'
    static readonly createNewProject = "button[class='btn mat-flat-button mat-button-base ng-star-inserted']"
    static readonly addProjectModalTitle = 'text=add projectclose'
    static readonly createNewProjectButton = 'mat-dialog-container[role="dialog"] button:has-text("Create")'
    static readonly searchProjectField = '[placeholder="Search\.\.\."]'
    static readonly filterProjectsButton = 'button:has-text("Filter")'
    static readonly itemsPerPageProjects = "div[class='page-count ng-star-inserted']"
    static readonly firstItemProjects = "a[class='ng-star-inserted']"

    static readonly errorNameProjectCreation = '#mat-error-4 >> text=clear This field is mandatory'
    static readonly errorAddressProjectCreation = '#mat-error-6 >> text=clear This field is mandatory'
    static readonly errorInvalidAddressProjectCreation = '#mat-error-6 >> text=clear Please select an address from the autocomplete panel'
    static readonly firstOptionVictoriei = 'text=Calea VictorieiBucharest, Romania'

    static readonly addressFieldProjectCreation = '[placeholder="Enter location"]'
    static readonly nameFieldProjectCreation = 'text=Nameclear This field is mandatory >> input[type="text"]'
		static readonly closeBtnProjectModal = 'text=close'
    static readonly leaveBtnProjectModal = 'button:has-text("Leave")'
    static readonly createBtnProjectModal = 'mat-dialog-container[role="dialog"] button:has-text("Create")'


    constructor(page: Page) {
        this.page = page;
    }

    async selectProject() {
        await this.page.locator(Home.projectDrd).click();
        await this.page.locator('span:has-text("QA_Bucuresti")').click();
    }


}