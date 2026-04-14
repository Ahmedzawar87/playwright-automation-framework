import { test, expect } from './fixtures/auth.fixture';
import { InventoryPage } from '../pages/InventoryPage';

test('User can login successfully', async ({ loggedInPage }) => {
  // Start
  const inventoryPage = new InventoryPage(loggedInPage);

  // Assertion
  await expect(loggedInPage).toHaveURL(/\/inventory/);
  await expect(inventoryPage.inventoryTitle).toBeVisible();
});

test('User can add an item to cart', async ({ loggedInPage }) => {
  // Start
  const inventoryPage = new InventoryPage(loggedInPage);

  // Action
  await inventoryPage.addItemToCart('Sauce Labs Backpack');

  // Assertion
  await expect(loggedInPage).toHaveURL(/\/inventory/);
  await expect(inventoryPage.cartBadge).toHaveText('1');
});
