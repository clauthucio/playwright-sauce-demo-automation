import { Locator, Page } from "@playwright/test"
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

    async fillCustomerInformation(customer: CustomerModel){
        await this.inputCustomerFirstName.fill(customer.firstname)
        await this.inputCustomerLastName.fill(customer.lastname)
        await this.inputCustomerZipCode.fill(customer.zipcode)
        await this.page.click('#continue')
    }
    
    async getPageTitle(text: string) {
        return this.page.locator(`css=.title >> text=${text}`)
    }

    async getOrderConfirmation() {
    return this.page.locator('css=.complete-header >> text=Thank you for your order!')
  }

}