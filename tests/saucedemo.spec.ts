import { expect, test } from '@playwright/test'
import { LoginPage } from './support/pages/loginPage'
import { ProductPage } from './support/pages/productsPage'
import { CartPage } from './support/pages/cartPage'
import { CheckoutPage } from './support/pages/checkoutPage'
import { LoginModel } from './fixtures/login.model'
import { CustomerModel } from './fixtures/customer.model'
import users from './fixtures/users.json'
import customers from './fixtures/customers.json'

let loginPage: LoginPage
let productPage: ProductPage
let cartPage: CartPage
let checkoutPage: CheckoutPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    productPage = new ProductPage(page)
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)
})

test.describe('login', () => {
    test('deve logar', async () => {
        const loginValido = users.usuarioValido as LoginModel
        await loginPage.go()
        await loginPage.login(loginValido)
        const title = await productPage.getPageTitle()
        await expect(title).toBeVisible()
    })

    test('não deve logar senha incorreta', async () => {
        const loginInvalido = users.usuarioInvalido as LoginModel
        await loginPage.go()
        await loginPage.login(loginInvalido)
        const error = await loginPage.getErrorMessage('Epic sadface: Username and password do not match any user in this service')
        await expect(error).toBeVisible()
    })

    test('não deve logar usuario bloqueado', async () => {
        const loginBloqueado = users.usuarioBloqueado as LoginModel
        await loginPage.go()
        await loginPage.login(loginBloqueado)
        const error = await loginPage.getErrorMessage('Epic sadface: Sorry, this user has been locked out.')
        await expect(error).toBeVisible()
    })

    test('deve deslogar', async () => {
        const loginValido = users.usuarioValido as LoginModel
        await loginPage.go()
        await loginPage.login(loginValido)
        const title = await productPage.getPageTitle()
        await productPage.logout()
        await expect(title).not.toBeVisible()
    })
})

test.describe('carrinho', () => {
    test('adicionar item ao carrinho', async () => {
        const loginValido = users.usuarioValido as LoginModel
        await loginPage.go()
        await loginPage.login(loginValido)
        await productPage.addItemToCart('Sauce Labs Backpack')
        await productPage.addItemToCart('Sauce Labs Bike Light')
        const badge = await cartPage.getCartBadge()
        await expect(badge).toBeVisible()
        await expect(badge).toHaveText('2')
    })

    test('remover item do carrinho', async () => {
        const loginValido = users.usuarioValido as LoginModel
        await loginPage.go()
        await loginPage.login(loginValido)
        await productPage.addItemToCart('Sauce Labs Backpack')
        const badge = await cartPage.getCartBadge()
        await expect(badge).toHaveText('1')
        await productPage.goToCart()
        const title = await cartPage.getPageTitle()
        await expect(title).toBeVisible()
        await cartPage.removeItemFromCart('Sauce Labs Backpack')
        await expect(badge).not.toBeVisible()
    })
})

test.describe('compra', () => {
    test('finalizar compra', async () => {
        const loginValido = users.usuarioValido as LoginModel
        await loginPage.go()
        await loginPage.login(loginValido)
        await productPage.addItemToCart('Sauce Labs Backpack')
        await productPage.goToCart()
        await cartPage.goToCheckout()

        const titleInformation = await checkoutPage.getPageTitle('Checkout: Your Information')
        await expect(titleInformation).toBeVisible()

        const clienteValido = customers.clienteValido as CustomerModel
        await checkoutPage.fillCustomerInformation(clienteValido)

        const titleOverview = await checkoutPage.getPageTitle('Checkout: Overview')
        await expect(titleOverview).toBeVisible()

        await checkoutPage.goToFinishOrder()

        const titleComplete = await checkoutPage.getPageTitle('Checkout: Complete!')
        await expect(titleComplete).toBeVisible()

        const confirmation = await checkoutPage.getOrderConfirmation()
        await expect(confirmation).toBeVisible()

    })
})