import { Page } from "@playwright/test"

export class CartPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async removeItemFromCart(itemName: string) {
        const item = this.page.locator(`.cart_item:has(.inventory_item_name:text-is("${itemName}"))`)
        await item.getByRole('button', { name: "Remove" }).click()
    }

    async getPageTitle() {
        return this.page.locator('css=.title >> text=Your Cart')
    }

    async getCartBadge() {
        return this.page.locator('css=.shopping_cart_badge')
    }

    async goToCheckout() {
        await this.page.click('#checkout')
    }

}