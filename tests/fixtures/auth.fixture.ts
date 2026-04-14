import { test as base } from '@playwright/test';
import { type Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { user } from '../data/user';

type MyFixtures = {
  loggedInPage: Page;
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    await use(page);
  },
});

export { expect } from '@playwright/test';
