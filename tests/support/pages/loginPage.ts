import { Locator, Page, expect } from "@playwright/test"
import { LoginModel } from "../../fixtures/login.model"

export class LoginPage{
    readonly page: Page
    readonly inputUserName: Locator
    readonly inputUserPassword: Locator

    constructor(page: Page){
        this.page = page
        this.inputUserName = page.locator('#user-name')
        this.inputUserPassword = page.locator('#password')
    }

    async go(){
        await this.page.goto('/')
    }

    async login(login: LoginModel){
        await this.inputUserName.fill(login.username)
        await this.inputUserPassword.fill(login.password)
        await this.page.click('#login-button')
    }

    async shouldNotLogin(){
        const target = this.page.locator('css=.error h3 >> text=Epic sadface: Username and password do not match any user in this service')
        await expect(target).toBeVisible()
    }

    async shouldBeBlocked(){
        const target = this.page.locator('css=.error h3 >> text=Epic sadface: Sorry, this user has been locked out.')
        await expect(target).toBeVisible()
    }

}