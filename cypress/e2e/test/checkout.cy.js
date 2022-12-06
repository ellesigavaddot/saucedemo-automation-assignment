/// <reference types="cypress" />
import Cart from '../page/cart.page'
import productData from '../data/product.data'
import Product from '../page/product.page'
import loginData from '../data/login.data'
import Login from '../page/login.page'
import personalData from '../data/checkoutInfo.data'


describe('Checkout Workflow', () => {
    beforeEach(()=>{
      cy.visit('/')
      Login.login(loginData.valid.username,loginData.valid.password)
    })

    it('should add single item to the cart and checkout', ()=> {

      Product.addItemToCart('Sauce Labs Backpack') // add item to cart

      cy.get(Product.buttonRemoveBackpack).should('exist') //assert that remove buton for item is seen nnow

      cy.get(Product.shoppingCartBadge).should('have.text', '1')       //assert that only one item is in the cart
      Product.goToCartPage()
      cy.intercept('cart.html')

      cy.get(Product.itemNames).should('have.text','Sauce Labs Backpack')
      cy.get(Product.itemsPrice).contains(productData.products[0].price)
      cy.get(Product.cartProductDescrp).contains(productData.products[0].description)

      Cart.checkout()
      Cart.inputCheckoutInfo(personalData.personal.firstname, personalData.personal.lastname, personalData.personal.postalcode)
  
      cy.get(Cart.checkoutProd).should('have.text', productData.products[0].name)
      cy.get(Cart.checkoutProdPrice).should('have.text', '$'+productData.products[0].price)
      cy.get(Cart.summaryInfo).first().should('exist') //assert that card info exists
      cy.get(Cart.summaryInfo).eq(1).should('exist') //asserts that shipping info exists in the DOM
      cy.get(Cart.itemSubtotal).should('include.text','$'+productData.products[0].price)
      
      Cart.completeOrder();

      cy.intercept('checkout-complete.html')
      cy.get(Cart.checkoutHeader).should('exist').and('have.text','Checkout: Complete!')
      cy.get(Product.shoppingCartBadge).should('not.exist')
      cy.get(Cart.checkoutMessage).should('have.text','THANK YOU FOR YOUR ORDER')
      cy.get(Cart.ponyExpressImage).should('exist').and('be.visible')
        
    })

    it('should add multiple products to cart and checkout', ()=>{

      Product.addItemToCart('Sauce Labs Backpack')
      Product.addItemToCart('Sauce Labs Bolt T-Shirt')
      Product.addItemToCart('Sauce Labs Fleece Jacket')

      cy.get(Product.shoppingCartBadge).should('have.text','3')
      Product.goToCartPage()

      let productsAdded = ['Sauce Labs Backpack','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket']
      cy.get(Cart.allItemsInCart).each(($elem, index) =>{
        expect($elem.text()).equal(productsAdded[index])
      })

      Cart.checkout()
      Cart.inputCheckoutInfo(personalData.personal.firstname, personalData.personal.lastname, personalData.personal.postalcode)

      // assert on the decriptions of the items using the product data file
      cy.get(Cart.cartProductDescrp).eq(0).should('have.text', productData.products[0].description)
      cy.get(Cart.cartProductDescrp).eq(1).should('have.text', productData.products[2].description)
      cy.get(Cart.cartProductDescrp).eq(2).should('have.text', productData.products[3].description)
      
      //assert on the price of the items
      const pricesAdded = ['$29.99', '$15.99', '$49.99']
      cy.get(Cart.checkoutProdPrice).each(($elem, index) => {
        expect($elem.text()).equal(pricesAdded[index])
      })
      const itemsSubtotals = Cart.calculateListOfTotals(pricesAdded)
      cy.get(Cart.itemSubtotal).should('have.text','Item total: $'+itemsSubtotals )
      cy.get(Cart.summaryInfo).first().should('exist') //assert that card info exists
      cy.get(Cart.summaryInfo).eq(1).should('exist') //asserts that shipping info exists in the DOM
      
      Cart.completeOrder();

      cy.intercept('checkout-complete.html')
      cy.get(Cart.checkoutHeader).should('exist').and('have.text','Checkout: Complete!')
      cy.get(Product.shoppingCartBadge).should('not.exist')
      cy.get(Cart.checkoutMessage).should('have.text','THANK YOU FOR YOUR ORDER')
      cy.get(Cart.ponyExpressImage).should('exist').and('be.visible')

    })

    //Negative Test

    it('should not checkout item with missing firstname', ()=>{

      Product.addItemToCart('Sauce Labs Backpack') // add item to cart

      Product.goToCartPage()
      cy.intercept('cart.html')

      Cart.checkout()
      Cart.inputCheckoutInfoNoFN(personalData.personal.lastname, personalData.personal.postalcode)
      cy.get(Cart.errorMessage).should('have.text','Error: First Name is required')

    })


    it('should not checkout item with missing lastname', ()=>{

      Product.addItemToCart('Sauce Labs Backpack') // add item to cart

      Product.goToCartPage()
      cy.intercept('cart.html')

      Cart.checkout()
      Cart.inputCheckoutInfoNoLN(personalData.personal.firstname, personalData.personal.postalcode)
      cy.get(Cart.errorMessage).should('have.text','Error: Last Name is required')

    })


    //Not an appropriate negative test because the user is able to checkout an empty cart

    // it('should not checkout an empty cart', ()=>{

    //   Product.addItemToCart('Sauce Labs Backpack')
    //   Product.goToCartPage()
    //   Product.removeItemFrCart('Sauce Labs Backpack')

    //   cy.get(Product.itemNames).should('not.exist')
    //   Cart.checkout()
    //   Cart.inputCheckoutInfo(personalData.personal.firstname, personalData.personal.lastname, personalData.personal.postalcode)

    //   cy.get(Cart)

    // })



})