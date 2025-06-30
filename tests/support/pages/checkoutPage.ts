import { Locator, Page, expect } from "@playwright/test"
import { CustomerModel } from "../../fixtures/customer.model"

export class CheckoutPage{
    readonly page: Page
    readonly inputCustomerFirstName: Locator
    readonly inputCustomerLastName: Locator
    readonly inputCustomerZipCode: Locator

    constructor(page: Page){
        this.page = page
        this.inputCustomerFirstName = page.locator('#first-name')
        this.inputCustomerLastName = page.locator('#last-name')
        this.inputCustomerZipCode = page.locator('#postal-code')
    }

    async goToFinishOrder(){
        await this.page.click('#finish')
    }

    async customerInformation(customer: CustomerModel){
        await this.inputCustomerFirstName.fill(customer.firstname)
        await this.inputCustomerLastName.fill(customer.lastname)
        await this.inputCustomerZipCode.fill(customer.zipcode)
        await this.page.click('#continue')
    } 

    async shouldBeOnCheckoutCustomerInformation(){
        const target = this.page.locator('css=.title >> text=Checkout: Your Information')
        await expect(target).toBeVisible()
    }

    async shouldBeOnCheckoutOverview(){
        const target = this.page.locator('css=.title >> text=Checkout: Overview')
        await expect(target).toBeVisible()
    }

    async shouldBeOnCheckoutComplete(){
        const targetTitle = this.page.locator('css=.title >> text=Checkout: Complete!')
        await expect(targetTitle).toBeVisible()
        const targetOrdered = this.page.locator('css=.complete-header >> text=Thank you for your order!')
        await expect(targetOrdered).toBeVisible()
    }
}