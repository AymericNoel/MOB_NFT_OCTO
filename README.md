# MOB NFT OCTO

#### *The aim of this repository is to explain in mob how to develop and deploy an NFT collection*

## Prerequisites
You will need to have :
- [NodeJs](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/)
  
Also, you will need to have a solidity extension in your favorite code editor (VsCode, IntelliJ, etc...).

## Setup
In order to have a correct setup, run `yarn install` in the root of the directory.
Also, copy the `.env.example` file to complete it with correct environnment variables. You can find all of the details in this file.

## Run the tests
If you want to run the tests, just launch: `yarn test`

## Deployment
If you want to deploy your smart contracts: 
1. Develop your solidity files
2. Update (if needed) [the migrations scripts](./migrations/)
3. Run `yarn migrate:goerli` to deploy your smart contracts to the goerli testnet
4. Run `yarn verify:goerli` in order to have your smart contracts verified on [Etherscan](https://goerli.etherscan.io/)