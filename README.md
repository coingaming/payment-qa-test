# Payment Gateway Automation - Playwright

## Overview

This project is set up to automate testing of a mock payment gateway. Your task is to write automated tests to simulate various payment scenarios (successful payment, insufficient funds, invalid card, etc.) using **Playwright** and **Axios**.

You are required to:
- Create a new private repository for your work.
- Write the necessary tests.
- Install dependencies and run the tests locally.
- Submit your work by sharing your repository with us.

## Instructions

### 1. Create a new private repository by using our repository template
Click the "Use this template" button, which will allow you to create your own repository based on our the template. Make sure you create a private repository.

### 2. Install Dependencies
This project uses Node.js and Playwright. You need to install the required dependencies using npm:

```bash
npm install
npx playwright install
npm install axios
```

### 3. Write Your Tests
Create and write your tests in the tests/ directory. The test file to modify is payment_gateway.spec.js. The tests will use Axios to interact with the mock payment gateway API. Alternatively, you may use Playwright’s built-in API testing capabilities.<br />
Feel free to enhance this script with more test cases or validations as needed.

### 4. Run the Tests Locally
Once you have written your tests, you can run them locally to make sure everything works as expected. To run the tests, use the following command:

```bash
npx playwright test
```

You can also run specific tests by specifying the test file:

```bash
npx playwright test tests/payment_gateway.spec.js
```

### 5. Commit and Push Your Changes
Once you are satisfied with your test cases, commit your changes.

### 6. Share the repository with us
As your repo is not public, share with **elriianova** and **ulyssesmurja** github users and notify the recruiter. Then we'll review your submission.

<br />
<br />
<br />

# Mock Payment Gateway Documentation

The mock payment gateway API is available at http://paytest.dev:5000/api/v1/payments (The gateway does not have a user interface and supports only API interactions).<br />

We designed it to simulate various payment scenarios based on the card number provided. It allows testing for successful payments, declined payments, invalid cards, and other scenarios without involving real transactions.


The following card numbers simulate different scenarios:
```bash
Success: 4111111111111111
Insufficient Funds: 4000000000000002
Invalid Card: Any card starting with 5
Expired Card: 4111111111111112
PayPal Success: paypal-success
```


#### **Endpoints:**

**POST** /api/v1/payments
```bash
This endpoint processes payments. It accepts the payment details in the request body and returns a response indicating whether the payment was successful or failed.
 ```      

#### **Request Details:**

**Method:** POST<br />
**Endpoint:** /api/v1/payments<br />
**Request Body:** The request body should be a JSON object with the following parameters:
```bash
{
  "card_number": "4111111111111111",
  "expiry_date": "12/25",
  "cvv": "123",
  "amount": 100.50,
  "currency": "USD",
  "payment_method": "credit_card"  //Can be 'credit_card', 'debit_card', or 'digital_wallet'
}
 ```
**Parameters:**

*   card_number: The card number being used for the transaction. Based on the card number, the gateway will simulate success, failure, or other scenarios.
    
*   expiry_date: The expiry date of the card in MM/YY format.
    
*   cvv: The 3-digit security code on the back of the card.
    
*   amount: The payment amount.
    
*   currency: The currency in which the payment is being made (e.g., "USD", "EUR").
    
*   payment_method: Specifies whether the payment is made via credit card, debit card, or a digital wallet. Valid values: "credit_card", "debit_card", "digital_wallet".

<br />

### **Card Number Scenarios:**

The payment gateway will return different responses based on the card number provided in the request.

1.  **Success Simulation:**
    
    *   **Card Number:** 4111 1111 1111 1111
        
    *   **Description:** Use this card number to simulate a successful payment.
        
    *   **Response:** Payment is processed successfully, and a transaction ID is returned.
        
2.  **Insufficient Funds Simulation:**
    
    *   **Card Number:** 4000 0000 0000 0002
        
    *   **Description:** Use this card number to simulate a failed payment due to insufficient funds.
        
    *   **Response:** Payment is declined with an error message indicating insufficient funds.
        
3.  **Invalid Card Simulation:**
    
    *   **Card Numbers Starting with '5':**
        
        *   **Example:** 5100 0000 0000 0000
            
        *   **Description:** Use any card number that starts with '5' to simulate an invalid card.
            
        *   **Response:** Payment fails with an error indicating the card is invalid.
            
4.  **Expired Card Simulation:**
    
    *   **Card Number:** 4111 1111 1111 1112
        
    *   **Description:** Use this card number to simulate a payment failure due to an expired card.
        
    *   **Response:** Payment is declined with an error indicating the card has expired.
        
5.  **Invalid CVV Simulation:**
    
    *   **Card Number:** 4111 1111 1111 1113
        
    *   **Description:** Use this card number to simulate an invalid CVV error.
        
    *   **Response:** Payment fails with an error indicating that the CVV is invalid.
        
6.  **Digital Wallet Simulation (PayPal):**
    
    *   **Card Number:** paypal-success
        
    *   **Description:** Use this to simulate a successful PayPal transaction.
        
    *   **Response:** Payment is successfully processed as a digital wallet transaction.
        

<br />

### **Response Structure:**

The API will return a JSON response based on the outcome of the payment request.

#### **Success Response:**
```bash
{
  "status": "success",
  "transaction_id": "txn_123456789",
  "message": "Payment processed successfully"
}
```
*   status: Indicates the payment was successful.
    
*   transaction_id: A unique identifier for the transaction.
    
*   message: A message confirming the success of the payment.
    

#### **Failure Responses:**

1.  **Insufficient Funds Response:**
```bash 
{
  "status": "failed",
  "error_code": "INSUFFICIENT_FUNDS",
  "message": "Payment failed due to insufficient funds"
}
```
2.  **Invalid Card Response:**
```bash 
{
  "status": "failed",
  "error_code": "INVALID_CARD",
  "message": "Payment failed due to invalid card details"
}
```
3.  **Expired Card Response:**
```bash 
{
  "status": "failed",
  "error_code": "EXPIRED_CARD",
  "message": "Payment failed due to expired card"
}
```
4.  **Invalid CVV Response:**
```bash 
{
  "status": "failed",
  "error_code": "INVALID_CVV",
  "message": "Payment failed due to invalid CVV"
}
```
5.  **PayPal Success Response:**
```bash 
{
  "status": "success",
  "transaction_id": "paypal_txn_987654321",
  "message": "Payment via PayPal processed successfully"
}
```
### **Error Codes and Messages:**

*   **INSUFFICIENT_FUNDS**: Payment declined due to insufficient funds.
*   **INVALID_CARD**: Payment failed due to an invalid card number.
*   **EXPIRED_CARD**: Payment declined because the card has expired.
*   **INVALID_CVV**: Payment declined due to an incorrect CVV.
*   **UNKNOWN_ERROR**: If any unexpected issue occurs during payment processing.
    

### **Test Cards for Different Currencies:**

You can simulate payments in different currencies using the same card numbers as above but specifying a different currency code. For instance:

*   currency: "USD" for US Dollars.
*   currency: "EUR" for Euros.
*   currency: "GBP" for British Pounds.
    

#### **Additional Rules:**

*   For **insufficient funds**, the failure will occur regardless of the currency.
*   For **digital wallets** like PayPal, the currency can be any supported value.
