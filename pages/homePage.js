exports.HomePage = class HomePage {
    url = 'http://www.automationpractice.pl/index.php';
    constructor(page) {
        this.page = page 
        this.lin_signIn = '.login'
        this.btn_account = '.account'
    }
    
    async naviToHomePage(){
        await this.page.goto(this.url)
    }
    async naviToLogin(){
        await this.page.locator(this.lin_signIn).click();
    }
}
