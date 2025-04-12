const {test, expect} = require('@playwright/test')
const {LandingPage} = require('../pages/LandingPage');
const { generateUserData } = require('../utils/mockData');

// test.describe('E2E User Flow - Register, Login, Create Account, Transfer & Verify Transaction',()=>{

    test('Complete full user flow from register to transaction validation', async ({page}) => {

        const landingPage = new LandingPage(page);

        const userData = generateUserData(); 

        const username = userData.username; 
        const password = userData.password; 

        await test.step('Register a new user', async ()=>{
            await landingPage.navigate(); 
            await page.waitForTimeout(3000); // waits 3 second

            console.log(`the generated user data is : ${JSON.stringify(userData, null, 2)}`)
            
            await landingPage.goToRegisterPage(); 

            await page.waitForTimeout(3000); // waits 3 second

        })

        // Logout and Login again
        await test.step('Logout and login', async () => {
            // login logic
          });
        
        
          // Open a new Bank Account 
          await test.step('Create a new bank account', async () => {
            // open account
          });


          // Transer the funds
          await test.step('Transfer funds', async () => {
            // transfer
          });
        

          // filter and verify transactions
          await test.step('Filter and verify transaction', async () => {
            // transaction check
          });
        

          // LOG OUT
          await test.step('Logout', async () => {
            // logout
          });

    })
// })