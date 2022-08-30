import { expect, Locator, Page } from '@playwright/test';

export class Login {

    readonly page: Page;
    static readonly emailField = '#mat-input-0'
    static readonly passwordField = '#mat-input-1'
    static readonly loginButton = '#login-button > span > span'
    static readonly errorEmailMsg = '#mat-error-0 > div'
    static readonly errorPasswordMsg = '#mat-error-1 > div'
    static readonly incorrectLoginMsg = '#incorrect-login-message'

    constructor(page: Page) {
        this.page = page;
    }

    async loginIntoApp(email: string, pass: string) {
        await this.page.locator(Login.emailField).fill(email);
        await this.page.locator(Login.passwordField).fill(pass);
        await this.page.locator(Login.loginButton).click();

    }
}
