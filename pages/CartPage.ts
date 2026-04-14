import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  cartItem(itemName: string): Locator {
    return this.page
      .locator('.cart_item')
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: itemName }) });
  }

  cartItemPrice(itemName: string): Locator {
    return this.cartItem(itemName).locator('.inventory_item_price');
  }

  proceedToCheckout(): Promise<void> {
    return this.checkoutButton.click();
  }
}
