import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

test('User can complete checkout with multiple items', async ({ page }) => {
  // Start
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const selectedItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/\/inventory/);

  // Action
  await inventoryPage.addItemsToCart(selectedItems);
  await expect(inventoryPage.cartBadge).toHaveText('2');

  await inventoryPage.openCart();
  await expect(page).toHaveURL(/\/cart/);

  for (const itemName of selectedItems) {
    await expect(cartPage.cartItem(itemName)).toBeVisible();
    await expect(cartPage.cartItemPrice(itemName)).toContainText('$');
  }

  await cartPage.proceedToCheckout();
  await expect(page).toHaveURL(/\/checkout-step-one/);

  await checkoutPage.fillCustomerInformation('Ahmed', 'Tester', '12345');
  await checkoutPage.continueCheckout();
  await expect(page).toHaveURL(/\/checkout-step-two/);

  await checkoutPage.finishCheckout();

  // Assertion
  await expect(page).toHaveURL(/\/checkout-complete/);
  await expect(checkoutPage.completeHeader).toBeVisible();
  await expect(checkoutPage.completeText).toContainText('Your order has been dispatched');
});
