
export class TransferFundsPage{

    constructor(page){
        this.page = page; 
        this.amountToTransfer = page.locator("input#amount");
        this.fromAccount = page.locator("select#fromAccountId");
        this.toAccount = page.locator("select#toAccountId");
        this.transferButton = page.locator("input[value='Transfer']");
    }

    async transferAmountFromAccount1ToAccount2(amount, account1, account2 )
    {
        console.log(`Transfering the amount: ${amount} from account 1 : ${account1} to Account 2: ${account2}`)

        await this.amountToTransfer.fill(amount.toString());

        await this.fromAccount.selectOption(account1);

        await this.toAccount.selectOption(account2);

        await this.transferButton.click(); 

    }
}