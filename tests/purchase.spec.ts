import { test, expect } from './fixtures/auth.fixture';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { user } from './data/user';

test('User can complete purchase flow', async ({ loggedInPage }) => {
  // Start
  const inventoryPage = new InventoryPage(loggedInPage);
  const cartPage = new CartPage(loggedInPage);
  const checkoutPage = new CheckoutPage(loggedInPage);

  // Action
  await expect(loggedInPage).toHaveURL(/\/inventory/);
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await expect(inventoryPage.cartBadge).toHaveText('1');
  await inventoryPage.openCart();
  await expect(loggedInPage).toHaveURL(/\/cart/);
  await expect(cartPage.cartItem('Sauce Labs Backpack')).toBeVisible();
  await cartPage.proceedToCheckout();
  await expect(loggedInPage).toHaveURL(/\/checkout-step-one/);
  await checkoutPage.fillCustomerInformation(user.firstName, user.lastName, user.zipCode);
  await checkoutPage.continueCheckout();
  await expect(loggedInPage).toHaveURL(/\/checkout-step-two/);
  await checkoutPage.finishCheckout();

  // Assertion
  await expect(loggedInPage).toHaveURL(/\/checkout-complete/);
  await expect(checkoutPage.completeHeader).toBeVisible();
  await expect(loggedInPage.getByText('Thank you for your order!')).toBeVisible();

});