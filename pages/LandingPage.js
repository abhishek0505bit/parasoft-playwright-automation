

/**
 * username
 * password
 * login button
 * register button
 */

export class LandingPage{
    constructor(page)
    {
        this.page = page; 
        this.usernameInput = page.locator('input[name = "username"]')
        this.passwordInput = page.locator('input[name = "password"]')
        this.loginButton = page.locator('input[value = "Log In"]')
        this.registerButton = page.locator('a[href="register.htm"]')
        this.url = 'https://parabank.parasoft.com/'

    }

    async navigate(){
        await this.page.goto(this.url);

    }

    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click(); 
        

    }

    async goToRegisterPage()
    {
        await this.registerButton.click();

    }
}