
class ProductPage{

    //#region Selectors

    get productHeader(){
        return ('div.header_secondary_container > span')
    }

    get productFilter(){
        return ('select.product_sort_container')
    }

    get shoppingCart(){
        return('a.shopping_cart_link')
    }

    get sideNavMenu(){
        return ('button#react-burger-menu-btn')
    }

    get shoppingCartBadge(){
        return('span.shopping_cart_badge')
    }

    get selectSortDropDown(){ 
        return ('.product_sort_container') 
    }


    //Product selectors
    
    get itemNames(){
        return ('div.inventory_item_name')
    }

    get itemsPrice(){
        return ('div.inventory_item_price')
    }

    get itemImgs(){
        return ('img.inventory_item_img')
    }

    get buttonsAddToCart(){
        return ('//button[text()="Add to cart"]')
    }

    get cartProductDescrp(){
        return ('div.inventory_item_desc')
    }


    //  Nav items - accesible when side nav opens
    get navAllItems(){
        return ('a#inventory_sidebar_link')
    }

    get navAbout(){
        return ('a#about_sidebar_link')
    }

    get navLogout(){
        return ('a#logout_sidebar_link')
    }

    get buttonRemoveBackpack(){
        return ('#remove-sauce-labs-backpack')
    }

    // problem user

    get dogProductImages(){
        return('img.inventory_item_img')
    }

    //#endregion                                                                                                                                

    //#region Methods
    addItemToCart(itemName){
        let addToCartBtn = `#add-to-cart-${this.applySelectorFormatting(itemName)}`

        cy.get(addToCartBtn).should('be.visible')
        cy.get(addToCartBtn).click()
    }

    addToCartButtonVisible(itemName){
        let addToCartBtn = `#add-to-cart-${this.applySelectorFormatting(itemName)}`

        cy.get(addToCartBtn).should('be.visible')
    }

    goToCartPage(){
        cy.get(this.shoppingCart).should('exist')
        cy.get(this.shoppingCart).click()
    }

    removeItemFrCart(itemName){ 
        let removeBtn = `#remove-${this.applySelectorFormatting(itemName)}`

        cy.get(removeBtn).should('be.visible')
        cy.get(removeBtn).click()
    }

    openSideNav(){
        cy.get(this.sideNavMenu).click()
    }

    logout(){
        cy.get(this.sideNavMenu).click()
        cy.get(this.buttonLogout).click()
    }

    selectSort(sort){
        cy.get(this.selectSortDropDown).select(sort)
    }

    applySelectorFormatting(item){
        return item.toLowerCase().replaceAll(' ', '-')
    }


    //#endregion


}
export default new ProductPage()
