import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

test('User can login successfully', async ({ page }) => {
  // Start
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.goto();
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeEnabled();

  // Action
  await loginPage.login('standard_user', 'secret_sauce');

  // Assertion
  await expect(page).toHaveURL(/\/inventory/);
  await expect(inventoryPage.inventoryTitle).toBeVisible();
});

test('User can add an item to cart', async ({ page }) => {
  // Start
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.goto();

  // Action
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addItemToCart('Sauce Labs Backpack');

  // Assertion
  await expect(page).toHaveURL(/\/inventory/);
  await expect(inventoryPage.cartBadge).toHaveText('1');
});
