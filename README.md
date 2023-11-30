# Assessment Smart Contract and DApp 

## Assessment Smart Contract

### Overview

This repository contains a simple Ethereum smart contract named `Assessment`. The smart contract is implemented in Solidity and serves as a basic financial system, allowing users to deposit, withdraw, calculate interest, increment funds, and calculate return on investment.

### Smart Contract Features

1. **Deposit**: Owners can deposit funds into the contract.
2. **Withdraw**: Owners can withdraw funds from the contract, given they have a sufficient balance.
3. **Calculate Interest**: A function to calculate simple interest based on principal, interest rate, and time.
4. **Increment Funds**: Owners can increment the funds in the contract.
5. **Calculate ROI**: A function to calculate the return on investment based on the investment amount and returns.

### Smart Contract Deployment

The smart contract is deployed with an initial balance specified during deployment. The contract owner is set to the address deploying the contract.

## Assessment DApp (Decentralized Application)

### Overview

The DApp is a simple React application that interacts with the deployed `Assessment` smart contract on the Ethereum blockchain. It utilizes MetaMask for wallet integration.

### DApp Features

1. **Connect Wallet**: Users can connect their MetaMask wallet to the DApp.
2. **Deposit**: Users can deposit Ether into the smart contract.
3. **Withdraw**: Users can withdraw Ether from the smart contract.
4. **View Balance**: Displays the user's account information, including name, country, and balance.
5. **Notifications**: Provides notifications for deposit and withdrawal transactions.
6. **Clear Notifications**: Allows users to clear transaction notifications.

### DApp Setup

1. Install MetaMask: Ensure MetaMask is installed in your browser.
2. Connect Wallet: Click "Connect" to connect your MetaMask wallet.
3. Interact with the Contract: Deposit and withdraw funds, view balance, and receive notifications.

### Technologies Used

- **Smart Contract**: Solidity
- **Frontend**: React, ethers.js
- **Wallet Integration**: MetaMask

## deployment 
# Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Author 
Praveen
pp0555319@gmail.com
