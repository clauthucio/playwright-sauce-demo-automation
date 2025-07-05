import { Page, expect } from "@playwright/test"

export class ProductPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async logout() {
        await this.page.click('#react-burger-menu-btn')
        await this.page.click('#logout_sidebar_link')
    }

    async addItemToCart(itemName: string) {
        const item = this.page.locator(`.inventory_item:has(.inventory_item_name:text-is("${itemName}"))`)
        await item.getByRole('button', { name: "Add to cart" }).click()
    }

    async goToCart() {
        await this.page.click('css=.shopping_cart_link')
    }

    async checkCartBadge(itemCount: number) {
        const badge = this.page.locator('css=.shopping_cart_badge')
        await expect(badge).toBeVisible()
        await expect(badge).toHaveText(itemCount.toString());
    }

    async getPageTitle() {
        return this.page.locator('css=.title >> text=Products')
    }
}