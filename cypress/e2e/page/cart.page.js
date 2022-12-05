
class CartPage{

    get allItemsInCart(){
        return ('div.inventory_item_name')
    }

    get cartContainer(){
        return ('div.cart_item')
    }

    get buttonContinue(){
        return ('#continue-shopping')
    }

    get buttonCheckout(){
        return ('#checkout')
    }

    get cartTitle(){
        return ('div.header_secondary_container > span')
    }

    get checkoutMessage(){
        return ('h2.complete-header')
    }

    get ponyExpressImage(){
        return ('img.pony_express')
    }
    

    //checkout: Your information

    get firstname(){
        return ('input#first-name')
    }

    get lastname(){
        return('input#last-name')
    }

    get postalCode(){
        return ('#postal-code')
    }

    get checkoutProd(){
        return ('div.inventory_item_name')
    }

    get checkoutProdPrice(){
        return ('div.inventory_item_price')
    }

    get buttonCancel(){
        return ('button#cancel')
    }

    get buttonContinueCheckout(){
        return ('input#continue')
    }

    get buttonFinishCheckout(){
        return ('button#finish')
    }

    get errorMessage(){
        return ('div.error-message-container')
    }

    //checkout: overview

    get summaryInfo(){
        return ('div.summary_value_label')
    }

    get itemSubtotal(){
        return ('div.summary_subtotal_label')
    }

    get itemQty(){
        return ('')
    }

    get itemTax(){
        return ('')
    }

    get itemTotal(){
        return ('div.summary_total_label ')

    }

    get cartProductDescrp(){
        return ('div.inventory_item_desc')
    }
    //checkout complete

    get checkoutHeader(){
        return ('div.header_secondary_container')
    }

    //#region Methods

    checkout(){
        cy.get(this.buttonCheckout).should('be.visible')
        cy.get(this.buttonCheckout).click()
    }

    // continueCheckout(){
    //     cy.get(this.buttonContinue).should('be.visible')
    //     cy.get(this.buttonContinue).click()
    // }

    inputCheckoutInfo(firstname, lastname, zip){
        cy.get(this.firstname).type(firstname)
        cy.get(this.lastname).type(lastname)
        cy.get(this.postalCode).type(zip)
        cy.get(this.buttonContinueCheckout).click()
    }

    paymentInfo(){
        cy.get(this.summaryInfo).first()
    }

    shippingInfo(){
        cy.get(this.summaryInfo).eq(1)
    }



    calTotal(itemPrice){
       let taxAmount = itemPrice * 0.08
       let total = taxAmount+ itemPrice
       return (total)
    }

    calculateListOfTotals(lst){
        var subTotal = 0
        lst.forEach(element => {
            //code to take each item from the list and add to a variable
            let newValue = element.replace(/\$/g,'')
            subTotal = +newValue + subTotal

            //code to return that outside of the loop
        });
        return (subTotal)
    }



    completeOrder(){
        cy.get(this.buttonFinishCheckout).should('be.visible')
        cy.get(this.buttonFinishCheckout).click()
    }

    //#endregion

}

export default new CartPage()