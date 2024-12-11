import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';

test.describe('sanityTest', ()=> {
  
  let page
  let homePage
  let loginPage

  test.beforeEach('page mange',async ({browser})=> {
    const context  = await browser.newContext()
    page = await context.newPage()
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    
    await page.evaluate(() => {
      const ads = document.querySelectorAll('iframe[id^="google_ads_iframe"]');
      ads.forEach(ad => ad.remove());
    });
  })

  test('test', async () => {
    await homePage.naviToHomePage()
    await homePage.naviToLogin()
    await loginPage.loginAction('user4Test','!@userPassword1234')
    await expect(page.locator(homePage.btn_userInfo)).toHaveText('user4Test')
  });

  test.afterAll(async () => {
    await page.close();
  });
})


