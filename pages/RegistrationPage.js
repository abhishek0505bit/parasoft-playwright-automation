

export class RegistrationPage {
    constructor(page){
        this.page = page; 
        this.firstName = page.locator("input[id = 'customer.firstName']");
        this.lastName = page.locator("input[id = 'customer.lastName']"); 
        this.address = page.locator("input[id = 'customer.address.street']"); 
        this.city = page.locator("input[id = 'customer.address.city']"); 
        this.state = page.locator("input[id = 'customer.address.state']"); 
        this.zipCode = page.locator("input[id = 'customer.address.zipCode']"); 
        this.phone = page.locator("input[id = 'customer.phoneNumber']"); 
        this.ssn = page.locator("input[id = 'customer.ssn']"); 
        this.username = page.locator("input[id = 'customer.username']"); 
        this.password = page.locator("input[id = 'customer.password']"); 
        this.confirm = page.locator("input[id = 'repeatedPassword']"); 
        this.registerButton = page.locator("input[value = 'Register']"); 

    }

    async fillDetails(userData)
    {
        // console on filling details.. and at the end tell the user data

        console.log(`Filling User Details:::::`);

        await this.firstName.fill(userData.firstName);

        await this.lastName.fill(userData.lastName);

        await this.address.fill(userData.address);

        await this.city.fill(userData.city);

        await this.state.fill(userData.state);

        await this.zipCode.fill(userData.zipCode);

        await this.phone.fill(userData.phone);

        await this.ssn.fill(userData.ssn);

        await this.username.fill(userData.username);

        await this.password.fill(userData.password);

        await this.confirm.fill(userData.password);

    }

    async clickOnRegister(){

        console.log(`Clicking on Register`);
        await this.registerButton.click(); 
    }
}

