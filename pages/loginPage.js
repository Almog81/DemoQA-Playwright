exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page
        
        //Locators
        this.txt_loginEmail = '#email'
        this.txt_password = '#passwd'
        this.btn_login = '#SubmitLogin'
    }
    
    async loginAction(email, password){
        await this.page.locator(this.txt_loginEmail).fill(email)
        await this.page.locator(this.txt_password).fill(password)
        await this.page.locator(this.btn_login).click()
    }
}
