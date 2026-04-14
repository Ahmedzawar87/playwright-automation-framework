import { test, expect } from './fixtures/auth.fixture';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { user } from './data/user';

test('User can complete checkout with multiple items', async ({ loggedInPage }) => {
  // Start
  const inventoryPage = new InventoryPage(loggedInPage);
  const cartPage = new CartPage(loggedInPage);
  const checkoutPage = new CheckoutPage(loggedInPage);
  const selectedItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

  await expect(loggedInPage).toHaveURL(/\/inventory/);

  // Action
  await inventoryPage.addItemsToCart(selectedItems);
  await expect(inventoryPage.cartBadge).toHaveText('2');

  await inventoryPage.openCart();
  await expect(loggedInPage).toHaveURL(/\/cart/);

  for (const itemName of selectedItems) {
    await expect(cartPage.cartItem(itemName)).toBeVisible();
    await expect(cartPage.cartItemPrice(itemName)).toContainText('$');
  }

  await cartPage.proceedToCheckout();
  await expect(loggedInPage).toHaveURL(/\/checkout-step-one/);

  await checkoutPage.fillCustomerInformation(user.firstName, user.lastName, user.zipCode);
  await checkoutPage.continueCheckout();
  await expect(loggedInPage).toHaveURL(/\/checkout-step-two/);

  await checkoutPage.finishCheckout();

  // Assertion
  await expect(loggedInPage).toHaveURL(/\/checkout-complete/);
  await expect(checkoutPage.completeHeader).toBeVisible();
  await expect(checkoutPage.completeText).toContainText('Your order has been dispatched');
});
