import { test, expect, type Page, chromium } from "@playwright/test";
import Constants from "../../constants";
import { Login } from "../../pages/login_page";
import { Home } from "../../pages/home_page";
import { Dashboard } from "../../pages/dashboard_page";
import { ToursCampaigns } from "../../pages/tours_capaigns_page";

let page: Page;

test.beforeEach(async ({ page }) => {
    
    await page.goto(Constants.QA_ENV);

    const login = new Login(page);
    await login.loginIntoApp(Constants.VALID_EMAIL, Constants.VALID_PASS);
    await expect(page.locator(Home.myProjectsButton)).toHaveText(" My projects ");

    const home = new Home(page);
    await home.selectProject();
    await page.waitForTimeout(250);
    await page.locator(Dashboard.toursAndCampaignsBtn).click();
});

test.describe.only("Tours and Campaigns test cases", () => {

    test("Verify if Tours and Campaigns tabs are visible", async ({ page }) => {    
        await expect(page.locator(ToursCampaigns.toursTab)).toBeVisible();
        await expect(page.locator(ToursCampaigns.campaignsTab)).toBeVisible();
    });

    test("On Campaigne verify if Planned campaigns, History, Name, Relate tour, Type, Start date, Assigned user, Peridiocity, Comment, Status", async ({ page }) => {
        await page.locator(ToursCampaigns.campaignsTab).click();
        await expect(page.locator(ToursCampaigns.plannedCampaignsTab)).toBeVisible();
        await expect(page.locator(ToursCampaigns.historyTab)).toBeVisible();
        await expect(page.locator(ToursCampaigns.nameTab)).toBeVisible();
        await expect(page.locator(ToursCampaigns.relatedTourTab)).toBeVisible();
        await expect(page.locator(ToursCampaigns.typeTab)).toBeVisible();
        await expect(page.locator(ToursCampaigns.startDateTab)).toBeVisible();
        await expect(page.locator(ToursCampaigns.assignedUserTab)).toBeVisible();
        await expect(page.locator(ToursCampaigns.periodicityTab)).toBeVisible();
        await expect(page.locator(ToursCampaigns.commentTab)).toBeVisible();
        await expect(page.locator(ToursCampaigns.statusTab)).toBeVisible();

    });

    test("Campaigns pagination choise is store per user", async ({ page }) => {
        const campaigns = new ToursCampaigns(page);
    
        await page.locator(ToursCampaigns.campaignsTab).click();
        await campaigns.changePagination();
        await page.locator(ToursCampaigns.toursTab).click();
        await page.locator(ToursCampaigns.campaignsTab).click();
        await expect(page.locator(ToursCampaigns.paginationDrd), '20').toBeVisible();
    });

    test("Campaigns sorting by name is working", async ({ page }) => {
        await page.locator(ToursCampaigns.campaignsTab).click();
        await page.locator(ToursCampaigns.nameTab).click()
        await expect(page.locator(ToursCampaigns.campaignsSortDesc)).toBeVisible();
    });

    test("Campaigns sorting by related tour is working", async ({ page }) => {
        await page.locator(ToursCampaigns.campaignsTab).click();
        await page.locator(ToursCampaigns.relatedTourTab).click()
        await expect(page.locator(ToursCampaigns.campaignsSortAsc)).toBeVisible();
    });

    test("Campaigns sorting by type is working", async ({ page }) => {
        await page.locator(ToursCampaigns.campaignsTab).click();
        await page.locator(ToursCampaigns.typeTab).click()
        await expect(page.locator(ToursCampaigns.campaignsSortAsc)).toBeVisible();
    });

    test("Campaigns sorting by start date is working", async ({ page }) => {
        await page.locator(ToursCampaigns.campaignsTab).click();
        await page.locator(ToursCampaigns.startDateTab).click()
        await expect(page.locator(ToursCampaigns.campaignsSortAsc)).toBeVisible();
    });

    test("Campaigns sorting by assigned is working", async ({ page }) => {
        await page.locator(ToursCampaigns.campaignsTab).click();
        await page.locator(ToursCampaigns.assignedUserTab).click()
        await expect(page.locator(ToursCampaigns.campaignsSortAsc)).toBeVisible();
    });

    test("Campaigns sorting by periodicity is working", async ({ page }) => {
        await page.locator(ToursCampaigns.campaignsTab).click();
        await page.locator(ToursCampaigns.periodicityTab).click()
        await expect(page.locator(ToursCampaigns.campaignsSortAsc)).toBeVisible();
    });
});
