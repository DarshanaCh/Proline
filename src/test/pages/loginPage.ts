import type { Page } from  '@playwright/test';
import { pageFixure } from '../../helpers/hooks/pageFiture';


export class loginPage{
  
    readonly page: Page;

    constructor(page:Page){
        this.page=pageFixure.page
    }

// export class loginPage{
//     readonly page: ;

    private usernameInput='#username';
    private passwordInput='#password';
    private loginButton ='//button[@role="button"]';
    private rememberUser='#rememberUser';
    private isEligible ='#isEligible';
    private account ='#display account information';
    private myBalance ='My Balance:';
    private loginError= '#loginError';
    private accountLink='#accountlink';


    // constructor(page:Page){
    //     this.page=pageFixure.page;
    // }

    //private Elemennts
    async navigationTOUrl(){
        const baseUrl: string = process.env.BASEURL as string;
        await pageFixure.page.goto(baseUrl);

    }
  

    async selectlogin(){
       await this.page.click(this.loginButton);
  
    }
    async selectusername(username: string)
    {
        await this.page.click(this.usernameInput);
        await this.page.fill(this.usernameInput,username) 
        
    }

    async selectpassword(password: string)
    {
        await this.page.click(this.passwordInput);
        await this.page.fill(this.passwordInput,password)
    }
    async selectRememberUser()
    {
        await this.page.check(this.rememberUser)

    }
    async selectisEligible()
    {
        await this.page.check(this.isEligible);

    }
    async visible()
    {
        await this.page.isVisible;
    }
    async displayAccount()
    {
        await this.page.check(this.account)
    }

    async displaymyBalance()
    {
        await (this.page.getByText(this.myBalance))
             
    }
    async checkloginError()
    {

    }
    async selectAccountLink()
    {   
        await pageFixure.page.getByLabel('visit OLG Login').isVisible();
        await pageFixure.page.getByLabel('Visit OLG Login').click();
    }
    async placeBet()
    {
        await this.page.getByRole('link', { name: 'NHL' }).click();
        await this.page.locator('.col-md-12').first().isVisible();
        await this.page.locator('.col-md-12').first().click();
        await this.page.getByLabel('Bet for Seattle Kraken vs St Louis - St Louis at').click();
        await this.page.getByPlaceholder('0.00').click();
        await this.page.getByPlaceholder('0.00').fill('3');
        await this.page.getByRole('button', { name: 'Place bet' }).click();
        await this.page.getByRole('button', { name: 'Confirm bet' }).click();

    }
    async logout()
    {             
        await this.page.getByLabel('open the balance tray').click();
        await this.page.getByLabel('display account information').click();
        await this.page.getByRole('button', { name: 'Log Out' }).click();
    }
    async close()
    {
       // await this.page.close();
    }
}