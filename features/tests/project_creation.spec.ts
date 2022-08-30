import { test, expect, type Page } from '@playwright/test';
import Constants from '../constants';
import { Login } from '../pages/login_page';
import { Home } from '../pages/home_page';
import { uniqueNamesGenerator, Config, adjectives, colors, animals, countries, starWars } from 'unique-names-generator';


test.beforeEach(async ({ page }) => {
    await page.goto(Constants.QA_ENV);

    const login = new Login(page);
    await login.loginIntoApp(Constants.VALID_EMAIL, Constants.VALID_PASS);

    await expect(page.locator(Home.myProjectsButton)).toHaveText(' My projects ');
    await page.locator(Home.myProjectsButton).click();
    await page.locator(Home.createNewProject).click();
    await page.locator(Home.addProjectModalTitle).click();
});

test.describe('Project creation test cases', () => {

    test('Verify that errors for missing mandatory fields are displayed @project_creation @smoke', async ({ page }) => {
        await page.locator(Home.createNewProjectButton).click();
        await expect(page.locator(Home.errorNameProjectCreation)).toBeVisible();
        await expect(page.locator(Home.errorAddressProjectCreation)).toBeVisible();
    });

    test('Verify that error for invalid address is displayed @project_creation @smoke', async ({ page }) => {
        await page.locator(Home.addressFieldProjectCreation).fill(Constants.INVALID_ADDRESS);
        await page.locator(Home.addProjectModalTitle).click();
        await page.locator(Home.createNewProjectButton).click();
        await expect(page.locator(Home.errorInvalidAddressProjectCreation)).toBeVisible();
    });

    test('Verify that project creation is successfully cancelled @project_creation @smoke', async ({ page }) => {
        const randomName: string = uniqueNamesGenerator({
            dictionaries: [countries, colors, starWars]
          });
        
        await page.locator(Home.addressFieldProjectCreation).fill(Constants.VALID_ADDRESS);
        await page.locator(Home.firstOptionVictoriei).click();
        await page.locator(Home.addProjectModalTitle).click();
        await page.locator(Home.nameFieldProjectCreation).fill(randomName);
        await page.locator(Home.closeBtnProjectModal).click();
        await page.locator(Home.leaveBtnProjectModal).click();
        await page.locator(Home.searchProjectField).fill(randomName);
        await page.locator(Home.filterProjectsButton).click();
        await expect(page.locator(Home.itemsPerPageProjects)).toHaveText(" 0 Total ");
    });

    test('Verify that project creation is successfully done @project_creation @smoke', async ({ page }) => {
        await page.locator(Home.addressFieldProjectCreation).fill(Constants.VALID_ADDRESS);
        await page.locator(Home.firstOptionVictoriei).click();
        await page.locator(Home.addProjectModalTitle).click();
        await page.locator(Home.nameFieldProjectCreation).fill(Constants.PROJECT_NAME);
        await page.locator(Home.createBtnProjectModal).click();
        await page.locator(Home.searchProjectField).fill(Constants.PROJECT_NAME);
        await page.locator(Home.filterProjectsButton).click();
        await expect(page.locator(Home.itemsPerPageProjects)).toHaveText(" 1 Total ");
        await expect(page.locator(Home.firstItemProjects)).toHaveText(Constants.PROJECT_NAME);
    });

    test('Verify that the project name should be unique @project_creation @smoke', async ({ page }) => {
        await page.locator(Home.addressFieldProjectCreation).fill(Constants.VALID_ADDRESS);
        await page.locator(Home.firstOptionVictoriei).click();
        await page.locator(Home.addProjectModalTitle).click();
        await page.locator(Home.nameFieldProjectCreation).fill(Constants.PROJECT_NAME);
        await page.locator(Home.createBtnProjectModal).click();
        await page.locator(Home.searchProjectField).fill(Constants.PROJECT_NAME);
        await expect(page.locator(Home.errorNameProjectCreation)).toContainText("This field is mandatory and must be unique");
    });

});