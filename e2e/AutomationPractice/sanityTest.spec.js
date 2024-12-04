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
    
  })

  test('test', async () => {
    await homePage.naviToHomePage()
    await homePage.naviToLogin()
    await loginPage.loginAction('user4Test@example.com','userPassword')
    await expect(page.locator(homePage.btn_account)).toHaveText('Sam One')
  });

  test.afterAll(async () => {
    await page.close();
  });
})


