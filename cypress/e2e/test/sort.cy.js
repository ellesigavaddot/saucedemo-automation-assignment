/// <reference types="cypress" />
import loginData from '../data/login.data'
import Login from '../page/login.page'
import Product from '../page/product.page'
import productData from '../data/product.data'

describe('Sort products on product page', ()=> {

before(()=>{
    cy.visit('/')
    Login.login(loginData.valid.username,loginData.valid.password)
})
    it('should sort products by name from A to Z', () =>{

        cy.get(Product.sideNavMenu).should('exist').and('be.visible')

        Product.selectSort(productData.sort['A to Z'])

        productData.products.sort()

        cy.get(Product.itemNames).each(($elem, index) => {
            expect($elem.text()).equal(productData.products[index].name)
        })
    })

    it('should sort products by name from Z to A', ()=>{
        cy.get(Product.sideNavMenu).should('exist').and('be.visible')

        Product.selectSort(productData.sort['Z to A'])

        productData.products.reverse()

        cy.get(Product.itemNames).each(($elem, index) => {
            expect($elem.text()).equal(productData.products[index].name)
        })
    })

    it('should sort products by price from low to high', ()=> {
        Product.selectSort(productData.sort['Low to High'])

        productData.products.sort((a,b)=> a.price - b.price)

        cy.get(Product.itemsPrice).each(($elem, index) =>{
            expect($elem.text()).equal(`$${productData.products[index].price}`)
        })

    })

    it('should sort products by price from high to low', ()=> {
        Product.selectSort(productData.sort['High to Low'])

        productData.products.sort((a,b)=> b.price - a.price)

        cy.get(Product.itemsPrice).each(($elem, index) =>{
            expect($elem.text()).equal(`$${productData.products[index].price}`)
        })

    })
    
    
})