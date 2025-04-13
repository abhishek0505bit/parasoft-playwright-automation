

export class LandingPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('input[name = "username"]')
        this.passwordInput = page.locator('input[name = "password"]')
        this.loginButton = page.locator('input[value = "Log In"]')
        this.registerButton = page.locator('a[href="register.htm"]')
        this.url = 'https://parabank.parasoft.com/'

    }

    async navigate() {

        console.log(`Navigating to url: ${this.url}`)
        await this.page.goto(this.url);

    }

    async fillLoginDetails(username, password) {

        console.log(`Filling Login details with username: ${username} and password: ${password}`)
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

    }

    async clickLogin() {

        console.log(`Clicking on Log in Button`)
        await this.loginButton.click();
    }

    async goToRegisterPage() {
        console.log(`Clicking on Register Button.`)
        await this.registerButton.click();

    }
}