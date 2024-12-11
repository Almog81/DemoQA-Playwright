exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page
        
        //Locators
        this.txt_userName = '#userName'
        this.txt_password = '#password'
        this.btn_login = '#login'
    }
    
    async removeAds() {
        await this.page.evaluate(() => {
            const ads = document.querySelectorAll('iframe[id^="google_ads_iframe"]');
            ads.forEach(ad => ad.remove());
        });
    }

    async safeClick(selector) {
        const element = this.page.locator(selector);
        await element.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await element.click();
    }
    
    async loginAction(email, password){
        await this.removeAds();
        await this.page.locator(this.txt_userName).fill(email)
        await this.page.locator(this.txt_password).fill(password)
        await this.safeClick(this.btn_login)
    }
}
