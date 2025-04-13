
export class HomePage {
    constructor(page) {
        this.page = page;
        this.openNewAccount = page.locator("a[href='openaccount.htm']");
        this.accountsOverview = page.locator("a[href='overview.htm']");
        this.transferFunds = page.locator("a[href='transfer.htm']");
        this.billPay = page.locator("a[href='billpay.htm']");
        this.findTransactions = page.locator("a[href='findtrans.htm']");
        this.updateContactInfo = page.locator("a[href='updateprofile.htm']");
        this.requestLoan = page.locator("a[href='requestloan.htm']");
        this.logOut = page.locator("a[href='logout.htm']");

    }

    async clickOpenNewAccount() {

        console.log(`Clicking on Open new Bank Account`)
        await this.openNewAccount.click();

    }

    async clickTransferFunds() {

        console.log(`Clicking on Transfer Funds`)
        await this.transferFunds.click();

    }

    async clickFindTransactions() {

        console.log(`Clicking on Find Transactions`)
        await this.findTransactions.click();

    }

    async clickLogOut() {

        console.log(`Clicking on LOG OUT button`)
        await this.logOut.click();

    }


}

