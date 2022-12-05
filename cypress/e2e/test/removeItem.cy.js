/// <reference types="cypress" />

import loginData from "../data/login.data"
import Login from '../page/login.page'
import Product from '../page/product.page'
import productData from '../data/product.data'


describe('Remove items from cart', ()=> {

    beforeEach(()=>{
        cy.visit('/')
        Login.login(loginData.valid.username, loginData.valid.password)
    })

    it('should remove single item from cart', ()=>{
        Product.addItemToCart('Sauce Labs Onesie')
        cy.get(Product.shoppingCartBadge).should('have.text', '1')
        Product.goToCartPage()
        cy.intercept('cart.html')

        cy.get(Product.itemNames).should('have.text','Sauce Labs Onesie')
        Product.removeItemFrCart('Sauce Labs Onesie')
        cy.get(Product.itemNames).should('not.exist')

    })
    
    it('should remove item from product list page', ()=>{

        Product.addItemToCart('Sauce Labs Fleece Jacket')
        cy.get(Product.shoppingCartBadge).should('have.text', '1')

        Product.removeItemFrCart('Sauce Labs Fleece Jacket')
        cy.get(Product.shoppingCartBadge).should('not.exist')

        Product.addToCartButtonVisible('Sauce Labs Fleece Jacket')
    })

})