import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryTitle: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryTitle = page.getByText('Products');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  addItemToCart(itemName: string): Promise<void> {
    return this.page
      .locator('.inventory_item')
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: itemName }) })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async addItemsToCart(itemNames: string[]): Promise<void> {
    for (const itemName of itemNames) {
      await this.addItemToCart(itemName);
    }
  }

  openCart(): Promise<void> {
    return this.cartLink.click();
  }
}
