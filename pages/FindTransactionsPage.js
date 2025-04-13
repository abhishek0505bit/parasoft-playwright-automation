
/**
 * Select an account
 * Find By data input box
 * Find Transactions Button
 * Validate
 * 
 */
import { expect } from "@playwright/test";

export class FindTransactionsPage {

    constructor(page) {
        this.page = page;
        this.selectAnAccountInput = page.locator("select#accountId");
        this.findByDateInput = page.locator("input#transactionDate");
        this.findTransactionsByDateButton = page.locator("button#findByDate");
        this.transactionTable = page.locator('table#transactionTable');

    }

    async findTransactionByDate(date, account) {
        console.log(`Finding transactions of Account: ${account} by Date: ${date}`)
        await this.selectAnAccountInput.selectOption(account);

        await this.findByDateInput.fill(date);

        await this.findTransactionsByDateButton.click();

    }

    async getTransactionDetails() {

        console.log(`Fetching Transaction Details: `)
        await this.transactionTable.waitFor({ state: 'visible' });
        const rows = await this.transactionTable.locator('tbody>tr');
        const transactions = [];

        for (let i = 0; i < await rows.count(); i++) {
            const row = rows.nth(i);
            const date = await row.locator('td:nth-child(1)').textContent();
            const transactionInfo = await row.locator('td:nth-child(2)').textContent();
            const debitedAmount = await row.locator('td:nth-child(3)').textContent();
            const creditedAmount = await row.locator('td:nth-child(4)').textContent();
            transactions.push({ date, transactionInfo, debitedAmount, creditedAmount });
        }

        return transactions;
    }

    async validateTransaction(date, account, amount, accountHistory) {

        console.log(`Validating Transactions of Account: ${account} of type: ${accountHistory} by Date: ${date}`)
        const transactions = await this.getTransactionDetails();
        console.log(`the Transactions value: ${transactions}`)

        let transaction;
        if (accountHistory === 'debit') {
            transaction = transactions.find(tx => tx.debitedAmount.includes(`${amount}`));
            console.log(`the value of transactions: ${transactions}`);
            console.log(`transaction value : ${transaction}`);
            await expect(transaction).not.toBeNull();  // Ensure the debited transaction exists
            await expect(transaction.creditedAmount).toBe('');  // Ensure there's no value in Credit column
            console.log(`Transaction debited from account ${account}: ${transaction.debitAmount}`);
        } else if (accountHistory === 'credit') {
            transaction = transactions.find(tx => tx.creditedAmount.includes(`${amount}`));
            await expect(transaction).not.toBeNull();  // Ensure the credited transaction exists
            await expect(transaction.debitedAmount).toBe('');  // Ensure there's no value in Debit column
            console.log(`Transaction credited to account ${account}: ${transaction.creditAmount}`);
        }

    }

}