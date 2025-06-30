import { Page, expect } from "@playwright/test"

export class CartPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async removeItemFromCart(itemName: string){
        const item = this.page.locator(`.cart_item:has(.inventory_item_name:text-is("${itemName}"))`)
        await item.getByRole('button', { name: "Remove" }).click()
    }

    async shouldBeOnCart(){
        const target = this.page.locator('css=.title >> text=Your Cart')
        await expect(target).toBeVisible()
    }

    async checkCartBadge(itemCount: number){
        const badge = this.page.locator('css=.shopping_cart_badge')
        await expect(badge).toBeVisible()
        await expect(badge).toHaveText(itemCount.toString());
    }

    async checkEmptyCartBadge(){
        const badge = this.page.locator('css=.shopping_cart_badge')
        await expect(badge).not.toBeVisible()
    }

    async goToCheckout(){
        await this.page.click('#checkout')
    }

}