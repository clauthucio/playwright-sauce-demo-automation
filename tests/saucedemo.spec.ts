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
        await productPage.shouldBeLogged()
    })

    test('não deve logar senha incorreta', async () => {
        const loginInvalido = users.usuarioInvalido as LoginModel
        await loginPage.go()
        await loginPage.login(loginInvalido)
        await loginPage.shouldNotLogin()
    })

    test('não deve logar usuario bloqueado', async () => {
        const loginBloqueado = users.usuarioBloqueado as LoginModel
        await loginPage.go()
        await loginPage.login(loginBloqueado)
        await loginPage.shouldBeBlocked()
    })

    test('deve deslogar', async () => {
        const loginValido = users.usuarioValido as LoginModel
        await loginPage.go()
        await loginPage.login(loginValido)
        await productPage.shouldBeLogged()
        await productPage.logout()
    })
})

test.describe('carrinho', () => {
    test('adicionar item ao carrinho', async () => {
        const loginValido = users.usuarioValido as LoginModel
        await loginPage.go()
        await loginPage.login(loginValido)
        await productPage.addItemToCart('Sauce Labs Backpack')
        await productPage.addItemToCart('Sauce Labs Bike Light')
        await productPage.checkCartBadge(2)
    })

    test('remover item do carrinho', async () => {
        const loginValido = users.usuarioValido as LoginModel
        await loginPage.go()
        await loginPage.login(loginValido)
        await productPage.addItemToCart('Sauce Labs Backpack')
        await productPage.checkCartBadge(1)
        await productPage.goToCart()
        await cartPage.shouldBeOnCart()
        await cartPage.removeItemFromCart('Sauce Labs Backpack')
        await cartPage.checkEmptyCartBadge()
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
        await checkoutPage.shouldBeOnCheckoutCustomerInformation()
        const clienteValido = customers.clienteValido as CustomerModel
        await checkoutPage.customerInformation(clienteValido)
        await checkoutPage.shouldBeOnCheckoutOverview()
        await checkoutPage.goToFinishOrder()
        await checkoutPage.shouldBeOnCheckoutComplete()
    })
})