import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('User cannot login with invalid credentials', async ({ page }) => {
  // Start
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // Action
  await loginPage.login('wrong_user', 'wrong_pass');

  // Assertion
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Epic sadface');
});
