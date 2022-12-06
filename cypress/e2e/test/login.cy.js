/// <reference types="cypress" />
import loginData from '../data/login.data'
import Login from '../page/login.page'
import Product from '../page/product.page'

describe('Data-driven login', () => {

beforeEach(()=>{
  cy.visit('/')
})

  it('should login with valid user', () => {
    Login.login(loginData.valid.username,loginData.valid.password)
    
    cy.get(Product.productHeader).should('have.text','Products')
    cy.get(Product.sideNavMenu).should('exist')
  })

  it('should not login a locked out user', ()=>{
    Login.login(loginData.lockedOutUser.username,loginData.lockedOutUser.password)

    cy.get(Login.lockedOutError).should('have.text',loginData.lockedOutUser.errorMessage)
  })

  it.only('should login with with problem user', ()=>{
    Login.login(loginData.problemUser.username, loginData.problemUser.password)

    //code for asserting on multimple images to have the same src
    cy.get(Product.itemImgs).should('have.length.lte', 6)
    cy.get(Product.itemImgs).each(($elem)=> {
      expect($elem).to.have.attr('src', '/static/media/sl-404.168b1cce.jpg')
    })
  }) 

  it('should login with performance glitch user', ()=>{
    Login.login(loginData.performanceGlitchUser.username,loginData.performanceGlitchUser.password)

    cy.get(Product.shoppingCart, {timeout: 40000}).should('exist')
  })

  // Negative tests

  it('should not login with incorrect password for a valid user', ()=>{
    Login.login(loginData.valid.username,'WrongPassword!')

    cy.get(Login.pwErrorMessage).should('have.text', 'Epic sadface: Username and password do not match any user in this service')
  })

})
