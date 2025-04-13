const { test, expect } = require('@playwright/test')
const { LandingPage } = require('../pages/LandingPage');
const { generateUserData } = require('../utils/mockData');
const { RegistrationPage } = require('../pages/RegistrationPage');
const { HomePage } = require('../pages/Homepage');
const { OpenNewAccountPage } = require('../pages/OpenNewAccountPage');
const { TransferFundsPage } = require('../pages/TransferFundsPage');
const { FindTransactionsPage } = require('../pages/FindTransactionsPage')


test('Complete full user flow from register to transaction validation', async ({ page }) => {

  const landingPage = new LandingPage(page);
  const userData = generateUserData();
  const username = userData.username;
  const password = userData.password;
  let account1, account2, amount;

  // Register a new User
  await test.step('Register a new user', async () => {

    await landingPage.navigate();
    await expect(page).toHaveURL(/.*parabank\.parasoft\.com.*/i);  // Ensure it's the landing page
    console.log(`Navigated successfully to URL: 'https://parabank.parasoft.com/'`)

    await page.waitForTimeout(3000); // waits 3 second

    console.log(`the generated user data is : ${JSON.stringify(userData, null, 2)}`)

    await landingPage.goToRegisterPage();
    const regiterTitle = await page.locator('h1.title').textContent();
    await expect(regiterTitle).toContain('Signing up is easy');
    console.log(`Navigated successfully to Register Page`);

    await page.waitForTimeout(3000); // waits 3 second

    const registerpage = new RegistrationPage(page);
    await registerpage.fillDetails(userData);
    console.log(`Successfully filled UserDetails:: \n ${userData}`);

    await page.waitForTimeout(3000);

    await registerpage.clickOnRegister();
    console.log(`Successfully Clicked on Register Button`)

    const usernameErrorLocator = page.locator('span[id="customer.username.errors"]');
    const isUsernameErrorVisible = await usernameErrorLocator.isVisible();

    if (isUsernameErrorVisible) {
        const errorMessage = await usernameErrorLocator.textContent();
        console.log('Error: User already exists');
        await expect(errorMessage).toContain('This username already exists.');
        throw new Error('User already exists... or Unexpected Registration');
    }

    const welcomeMessage = page.locator('h1.title');
    await expect(welcomeMessage).toHaveText(`Welcome ${username}`);
    console.log(`User: ${username} successfully Registered`)

    await page.waitForTimeout(3000);

  })

  // Logout and Login again
  await test.step('Logout and login', async () => {

    const homePage = new HomePage(page);
    await homePage.clickLogOut();
    await expect(page.locator('input[name="username"]')).toBeVisible(); // after successful Log out, username field should be visible
    console.log(`Logged Out Successfully`);

    await page.waitForTimeout(3000);

    await landingPage.fillLoginDetails(username, password);
    console.log(`Filled LOG IN details successfully with username: ${username} and password: ${password}`)

    await page.waitForTimeout(3000);

    await landingPage.clickLogin();

    const successLocator = page.locator('div#showOverview > h1.title');
    const errorLocator = page.locator('div#showError > h1.title');

    const successVisible = await successLocator.isVisible();
    const errorVisible = await errorLocator.isVisible();

    if (successVisible) {
      const successText = await successLocator.textContent();
      console.log('User logged in successfully!');
      await expect(successText).toContain('Accounts Overview');
    } else if (errorVisible) {
      const errorText = await errorLocator.textContent();
      console.log('Login failed');
      await expect(errorText).toContain('Error!');
    } else {
      throw new Error('Unexpected state after login attempt');
    }
  });


  // Open a new Bank Account 
  await test.step('Create a new bank account', async () => {
    const homePage = new HomePage(page);
    const openNewAccountPage = new OpenNewAccountPage(page);

    await homePage.clickOpenNewAccount();
    console.log(`Clicked on Open New Account`);

    const pageTitle = await page.locator('div#openAccountForm > h1.title').textContent();
    await expect(pageTitle).toContain('Open New Account');
    console.log('Successfully navigated to the Open New Account page.');

    await page.waitForTimeout(3000);  // Wait for the page to load

    await openNewAccountPage.selectTypeOfAccount('savings');
    console.log(`Selected the account type as: Savings`);

    await page.waitForTimeout(2000);  // Wait for the account selection

    account1 = await openNewAccountPage.selectAccount();
    console.log(`Account id 1: ${account1}`);

    await openNewAccountPage.clickOnOpenNewAccount();
    await page.waitForTimeout(3000);  // Wait for the account creation process to complete

    const errorLocator = page.locator('div#openAccountError > h1.title');
    const isErrorVisible = await errorLocator.isVisible();

    if (isErrorVisible) {
      console.log('An error occurred during the account creation process');
      const errorText = await errorLocator.textContent();
      await expect(errorText).toContain('Error!'); 
      throw new Error('Account creation failed due to error');
    } else {
      const successTitle = await page.locator('div#openAccountResult > h1.title').textContent();
      await expect(successTitle).toContain('Account Opened');
      console.log('Account opened successfully!');
    }

    account2 = await openNewAccountPage.extractNewAccountId();
    await page.waitForTimeout(2000);  // Wait for the account id extraction

    console.log(`The new account ID is: ${account2}`);
    console.log(`Account 1: ${account1}, and Account 2: ${account2}`);
  });


  // Transer the funds
  await test.step('Transfer funds', async () => {

    const homePage = new HomePage(page);
    const transferFundsPage = new TransferFundsPage(page);
    amount = 250;

    await homePage.clickTransferFunds();
    console.log(`Clicked on Transfer Funds`);

    const pageTitle = await page.locator('div#showForm > h1.title').textContent();
    await expect(pageTitle).toContain('Transfer Funds');  // Ensure we are on the Transfer Funds page
    console.log('Successfully navigated to the Transfer Funds page.');

    await page.waitForTimeout(3000); // Wait for the page to load

    await transferFundsPage.transferAmountFromAccount1ToAccount2(amount, account1, account2);

    const successTitle = await page.locator('div#showResult > h1.title').textContent();
    await expect(successTitle).toContain('Transfer Complete');
    console.log('Transfer successful!');

    const errorLocator = page.locator('div#showError > h1.title');
    const isErrorVisible = await errorLocator.isVisible();

    if (isErrorVisible) {
      console.log('An error occurred during the fund transfer');
      const errorText = await errorLocator.textContent();
      await expect(errorText).toContain('Error!');  // Validate the error message
      throw new Error('Transfer failed due to error');
    }

    console.log(`Transfer of ${amount} from account ${account1} to account ${account2} completed successfully.`);
    await page.waitForTimeout(3000); // Wait for the page to load

  });

  // filter and verify transactions
  await test.step('Filter and verify transaction', async () => {

    const homePage = new HomePage(page);
    const findTransactionsPage = new FindTransactionsPage(page);

    const debitedAccount = account1;
    const creditedAccount = account2;
    const accountHistory = 'debit';

    await homePage.clickFindTransactions();
    console.log('Clicked on Find Transactions');
    await page.waitForTimeout(3000); // Wait for the page to load


    const pageTitle = await page.locator('div#formContainer > h1.title').textContent();
    await expect(pageTitle).toContain('Find Transactions');  // Ensure we are on the Find Transactions page
    console.log('Successfully navigated to the Find Transactions page.');

    const validDate = '04-13-2025'; 

    await findTransactionsPage.findTransactionByDate(validDate, debitedAccount);

    if (accountHistory === 'debit') {
      await findTransactionsPage.validateTransaction(validDate, debitedAccount, amount, 'debit');
    } else {
      await findTransactionsPage.validateTransaction(validDate, creditedAccount, amount, 'credit');
    }

    const resultsTitle = await page.locator('div#resultContainer > h1.title').textContent();
    await expect(resultsTitle).toContain('Transaction Results');  // Validate that transaction results are displayed
    console.log('Transaction results displayed successfully.');

    const errorLocator = page.locator('div#errorContainer > h1.title');
    const isErrorVisible = await errorLocator.isVisible();

    if (isErrorVisible) {
      console.log('An error occurred during the transaction search');
      const errorText = await errorLocator.textContent();
      await expect(errorText).toContain('Error!');  // Validate the error message
      throw new Error('Transaction search failed due to error');
    }

    console.log(`Transaction results validated successfully for ${debitedAccount} account.`);
  });



  // LOG OUT
  await test.step('Logout', async () => {

    const homePage = new HomePage(page);
    await homePage.clickLogOut();
    await expect(page.locator('input[name="username"]')).toBeVisible(); // after successful Log out, username field should be visible
    console.log(`Logged Out Successfully`);
  });
})
