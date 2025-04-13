
export class OpenNewAccountPage{
    constructor(page)
    {
        this.page = page; 
        this.typeOfAccount = page.locator("select#type");
        this.fromAccountId = page.locator("select#fromAccountId");
        this.openNewAccountButton = page.locator("input[value = 'Open New Account']");
        this.newAccountId = page.locator("a#newAccountId");
    }

    async selectTypeOfAccount(accountType)
    {
        console.log(`Selecting AccountType : ${accountType}`)
        await this.typeOfAccount.selectOption(accountType.toUpperCase()); 
        
    }

    async selectAccount()
    {
        const fromAccountValue = await this.fromAccountId.locator('option').first().getAttribute('value');

        console.log(`Selecting Account ID: ${fromAccountValue}`);

        await this.fromAccountId.selectOption(fromAccountValue);

        return fromAccountValue; 

    }

    async clickOnOpenNewAccount(){

        console.log(`Clicking on Open New Account`);

        await this.openNewAccountButton.click(); 

    }

    async extractNewAccountId(){
        
        console.log(`Fetching new Account ID:::::`)
        const newAccountId = await this.newAccountId.textContent();
        console.log(`New Account ID Fetched: ${newAccountId}`);

        return newAccountId; 
    }

}