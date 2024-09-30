# Project: Beneficiary Transaction Manager

## Author Information

- **Author**: Trần Hồng Phúc
- **Phone**: 0903347264
- **Email**: Phuctien1997@gmail.com

---

## Project Overview

This project is designed to facilitate transactions with beneficiaries. It allows users to create new beneficiaries, validate IBANs, and perform transactions. The application is also capable of preserving the state of beneficiaries, transaction history, and balance when the app is reopened. This ensures that users don't lose any data between sessions.

### Features Implemented:

1. **Create a Beneficiary Page**:
   - Users can add a new beneficiary with fields for **First Name**, **Last Name**, and **IBAN**.
   - An IBAN validator is incorporated to ensure that the IBAN is valid before saving the beneficiary.
2. **Select Beneficiary for Transaction**:
   - Users can view a list of all added beneficiaries and select one to perform a transaction.
   - Transaction details, such as beneficiary name and IBAN, are displayed during the transaction process.
3. **State Preservation**:

   - The app uses local storage via `AsyncStorage` to retain the list of beneficiaries, transaction history, and balance even after the app is closed and reopened.

4. **iOS Fix Automation**:
   - A shell script named **`fix_ios.sh`** has been added to automate the fixing of common iOS build issues and apply patches to native code. This script helps developers quickly resolve common errors when working with native iOS code in React Native projects.

---

## Test Requirements (as provided by the employer)

You are working on an application that facilitates transactions to beneficiaries. To successfully complete the test, you need to implement the following features:

- Introduce a new page to create a beneficiary, including fields for their first name, last name, and IBAN. Additionally, incorporate an IBAN validator to ensure the IBAN's validity.
- Enable the selection of a beneficiary from a list when making a transaction.
- Preserve the state of the application so that upon reopening, the list of beneficiaries, transaction history, and balance are retained.

Note: You have free rein in how you want to implement this test, give it your best shot!

---

## Libraries and Tools Used

### **React Native**

The core framework for building mobile applications.

### **zustand**

Used for state management. Zustand was chosen for its lightweight nature and ease of setup. It allows for managing global states like beneficiaries and transactions, which are persisted using AsyncStorage.

- **Why zustand?**
  - Simple to use.
  - No boilerplate code like in Redux.
  - Allows for persistence of state using `AsyncStorage`.

### **AsyncStorage**

Local storage solution to persist beneficiary data and transaction history when the app is closed and reopened.

- **Why AsyncStorage?**
  - Perfect for lightweight persistence.
  - Easily integrates with Zustand's `persist` middleware.

### **babel-plugin-module-resolver**

Used to simplify imports by setting up aliases for different directories in the project, making the code cleaner and easier to manage.

- **Why module resolver?**
  - Avoid long relative paths like `../../components`.
  - Helps maintain a cleaner project structure with aliases like `@components`.

### **FlashList (from @shopify/flash-list)**

For efficiently rendering large lists of beneficiaries in the `HomeScreen`. This library is optimized for high-performance rendering, especially useful when dealing with a growing number of beneficiaries.

- **Why FlashList?**
  - Better performance than React Native's `FlatList` for large lists.
  - Built specifically for scenarios where rendering speed is crucial.

### **IBAN Library**

The `iban` library is used for validating and formatting IBANs. This ensures that all entered IBANs are compliant with international standards.

- **Why iban library?**
  - Strict validation for IBANs.
  - Supports multiple countries with different IBAN formats.

---

## Screen Breakdown

### **1. HomeScreen**

- **Purpose**: Displays the list of all beneficiaries. From here, users can navigate to create a new beneficiary or initiate a transaction with an existing one.
- **Libraries**:
  - `FlashList` for efficient rendering of the beneficiary list.
  - Zustand for fetching and managing the list of beneficiaries.

### **2. CreateBeneficiaryScreen**

- **Purpose**: Allows users to input the details of a new beneficiary, including their first name, last name, and IBAN. The IBAN is automatically validated before the user can save the beneficiary.
- **Libraries**:
  - `Formik` and `Yup` for form handling and validation.
  - `iban` library for validating IBAN numbers.
  - Zustand to save the new beneficiary to the global state and AsyncStorage.

### **3. TransactionScreen**

- **Purpose**: Handles the actual transaction process. Users can select a beneficiary from the list and perform a transaction with them. The transaction is then logged and stored.
- **Libraries**:
  - Zustand for managing the transaction state and logging.
  - Simple UI components like `Button` and `Text` for transaction confirmation.

---

## Shell Script: fix_ios.sh

This project includes a shell script named `fix_ios.sh` that automates fixing iOS build issues in React Native projects. The script performs tasks such as:

- Rebuilding the iOS project.
- Applying patches to the native code.
- Resolving common dependency issues.

To run the script, execute:

```bash
sh fix_ios.sh
```

## **_Setup and Installation_**

To set up and run this project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/TranPhuc9898/Interview_SERDAO.git

   ```

2. **Install dependencies: After cloning the repository, navigate to the project directory and run the following command to install all necessary dependencies:**
   ```bash
    yarn dev
   ```
3. **Fix iOS build issues: For iOS, there is a custom shell script included that helps automatically resolve build issues. Simply run:**

```bash
yarn fix_ios
```

4. **Open Xcode: After running the fix script, open Xcode and navigate to the .xcworkspace file:**

```bash
Go to: SerdaoTest.xcworkspace
```

5. **Configure build destination: In Xcode, follow these steps to ensure the correct device is selected for building:**

```bash
On the top menu bar, select:
Product -> Destination -> Show Preferred Run Destination
Choose a device that has Rosetta enabled.
```

6. **Clean and build:**

```bash
In Xcode, clean the project and then build it.
```

7. **Handle build errors: After the build process, you may encounter errors on the screen. In that case:**

```bash
Open a new terminal window.
Navigate to the project directory and run the following command to start the application:
yarn start
```
