
class LoginPage {

    get inputUsername(){
        return ('input#user-name')
    }

    get inputPassword(){
        return ('input#password')
    }

    get buttonLogin(){
        return ('input#login-button')
    }

    get lockedOutError(){
        return ('div.error-message-container')
    }

    get pwErrorMessage(){
        return('div.error-message-container.error')
    }

    login(username,password) {
        cy.get(this.inputUsername).type(username)
        cy.get(this.inputPassword).type(password)
        cy.get(this.buttonLogin).click()
    }
}
export default new LoginPage()