## **Project: Parasoft Playwright Automation**

### **Description**

This project involves automating a series of actions on the ParaBank demo website using Playwright and JavaScript. The test suite covers several actions, such as user registration, login, account creation, fund transfer, and transaction validation.

---

### **Prerequisites**

Make sure you have the following installed before you proceed:

- **Node.js** (version 16.x or higher)
- **npm** (Node Package Manager)

---

### **Dependencies**

The following important dependencies are used in this project:

#### 1. **`@faker-js/faker`**:
   - **Version**: `^9.6.0`
   - **Purpose**: This package is used to generate **mock data** for testing purposes. It helps in generating fake data like usernames, addresses, phone numbers, etc., to simulate realistic user actions in the automated tests.

#### 2. **`@playwright/test`**:
   - **Version**: `^1.51.1`
   - **Purpose**: This is the core testing framework for **Playwright**. It provides APIs for browser automation (e.g., navigating pages, clicking buttons, filling forms, taking screenshots) and assertions (e.g., verifying page content). This dependency enables us to run end-to-end (E2E) tests on the ParaBank demo website.

#### 3. **`@types/node`**:
   - **Version**: `^22.14.0`
   - **Purpose**: This package provides **TypeScript types** for Node.js. It ensures that we can use Node.js functionalities with proper type checking and autocompletion when writing or running tests.
   
   _(But here we are using Javascript, we can always switch to typescript whenever needed)_

---

### **Setup and Installation**

To get started, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/abhishek0505bit/parasoft-playwright-automation.git
    cd parasoft-playwright-automation
    ```

2. **Install the dependencies**:
    Run the following command to install all the necessary dependencies listed in `package.json`:
    ```bash
    npm install
    ```

---

### **Running the Tests**

There are two ways to run the Playwright tests:

#### **Option 1: Use npm scripts**

If you'd like to run the tests in different modes (headed, headless, or UI mode), you can use the pre-configured npm scripts.

1. **Run the tests in headed mode (with UI)**:
   ```bash
   npm run test-headed
   ```

2. **Run the tests in headless mode (no UI)**:
   ```bash
   npm run test-headless
   ```

3. **Run the tests in UI mode**:
   ```bash
   npm run test-ui
   ```

These scripts are defined in your `package.json` file and use the Playwright testing framework to execute the tests.

#### **Option 2: Run the tests manually with npx**

Alternatively, you can run the tests manually using **npx** to execute the Playwright test command.

1. **To run all the files in tests folder:**

    ```bash
    npx playwright test
    ```

2. **To run a specific test file:**

    ```bash
    npx playwright test path/to/test-file.spec.js
    ```

---


### **Test Directory Structure**

The tests are located in the `/tests` directory, and each test is written in the `.spec.js` format. These test files correspond to different parts of the application we're automating.

---

### **Sample Test Command**:

Here's an example of running the tests in **headed mode**:

```bash
npx playwright test tests/test01.spec.js --headed
```

This will execute the test file `test01.spec.js` in **headed mode**, meaning you'll see the browser window as the test runs.

---

### **Common Issues**

- **Missing Dependencies**: Ensure you run `npm install` to install all necessary dependencies.
- **Browser Compatibility**: Playwright supports Chromium, Firefox, and WebKit. Make sure you are using the correct browser for your tests.
- **Test Failures**: If a test fails, review the error logs to debug. Most test failures are related to element selectors or timing issues, such as waiting for elements to load.

---

### **Conclusion**

This project uses **Playwright** for browser automation and **Faker** for generating mock data to automate actions and validations on the ParaBank demo website. By following the setup and execution instructions, you can easily run the tests in different modes, check for issues, and ensure that the application behaves as expected.

---