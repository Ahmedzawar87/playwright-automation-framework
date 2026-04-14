import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('User can complete purchase flow', async ({ page }) => {
  // Start
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();

  // Action
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/\/inventory/);
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await expect(inventoryPage.cartBadge).toHaveText('1');
  await inventoryPage.openCart();
  await expect(page).toHaveURL(/\/cart/);
  await expect(cartPage.cartItem('Sauce Labs Backpack')).toBeVisible();
  await cartPage.proceedToCheckout();
  await expect(page).toHaveURL(/\/checkout-step-one/);
  await checkoutPage.fillCustomerInformation('Ahmed', 'Test', '12345');
  await checkoutPage.continueCheckout();
  await expect(page).toHaveURL(/\/checkout-step-two/);
  await checkoutPage.finishCheckout();

  // Assertion
  await expect(page).toHaveURL(/\/checkout-complete/);
  await expect(checkoutPage.completeHeader).toBeVisible();

});