import { test, expect, type Page, chromium } from '@playwright/test';
import Constants from '../constants';
import { Login } from '../pages/login_page';
import { Home } from '../pages/home_page';

let page: Page;

test.beforeAll(async () => {
    const browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(Constants.QA_ENV);
});

test.afterAll(async () => {
    await page.close();
});

test.describe('Login test cases', () => {

    test('User is not logged in with valid email, empty password @login @smoke', async () => {
        const login = new Login(page);
        await login.loginIntoApp(Constants.VALID_EMAIL, Constants.EMPTY);
        await expect(page.locator(Login.errorPasswordMsg)).toBeVisible();
    });

    test('User is not logged in with empty email and password @login @smoke', async () => {
        const login = new Login(page);
        await login.loginIntoApp(Constants.EMPTY, Constants.EMPTY);
        await expect(page.locator(Login.errorEmailMsg)).toBeVisible();
        await expect(page.locator(Login.errorPasswordMsg)).toBeVisible();
    });

    test('User is not logged in with empty email and valid password @login @smoke', async () => {
        const login = new Login(page);
        await login.loginIntoApp(Constants.EMPTY, Constants.VALID_PASS);
        await expect(page.locator(Login.errorEmailMsg)).toBeVisible();
    });

    test('User is not logged in with valid email and invalid password @login @smoke', async () => {
        const login = new Login(page);
        await login.loginIntoApp(Constants.VALID_EMAIL, Constants.INVALID_PASS);
        await expect(page.locator(Login.incorrectLoginMsg)).toHaveText('Please enter the correct username and password. Note that both fields may be case-sensitive.');
    });

    test('User is not logged in with invalid email and invalid password @login @smoke', async () => {
        const login = new Login(page);
        await login.loginIntoApp(Constants.INVALID_EMAIL, Constants.INVALID_PASS);
        await expect(page.locator(Login.incorrectLoginMsg)).toHaveText('Please enter the correct username and password. Note that both fields may be case-sensitive.');
    });

    test('User is not logged in with invalid email and valid password @login @smoke', async () => {
        const login = new Login(page);
        await login.loginIntoApp(Constants.INVALID_EMAIL, Constants.VALID_PASS);
        await expect(page.locator(Login.incorrectLoginMsg)).toHaveText('Please enter the correct username and password. Note that both fields may be case-sensitive.');
    });

    test('User is not logged in with valid email and invalid case sensitive password @login @smoke', async () => {
        const login = new Login(page);
        await login.loginIntoApp(Constants.VALID_EMAIL, Constants.INVALID_CASE_SENSITIVE_PASS);
        await expect(page.locator(Login.incorrectLoginMsg)).toHaveText('Please enter the correct username and password. Note that both fields may be case-sensitive.');
    });

    test('User is successfully logged in with valid credentials @login @smoke', async () => {
        const login = new Login(page);
        await login.loginIntoApp(Constants.VALID_EMAIL, Constants.VALID_PASS);
        await expect(page.locator(Home.myProjectsButton)).toHaveText(' My projects ');
    });
})