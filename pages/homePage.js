exports.HomePage = class HomePage {
    constructor(page) {
        this.page = page 
        // Locators
        this.btn_login = '#login'
        this.btn_userInfo = '#userName-value'
        
        // URLs
        this.path = '/books'
    }
    
    async naviToHomePage(){
        await this.page.goto(this.path)
    }

    async naviToLogin(){
        await this.page.locator(this.btn_login).click()
    }
}
