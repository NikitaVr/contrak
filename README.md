# Midna

Midna helps teams track track their smart contract deployments.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/qc4V0T?referralCode=kMU60t)

## Contributing

### Setup

1. Install Node 18 and Yarn
2. Run `yarn install`
3. Run `yarn db:push` to generate the database
4. Run `yarn dev:web` to start the web server
5. Run `cd hardhat-example && npx hardhat node` to start the hardhat node
6. Run `npx hardhat run --network localhost scripts/deploy.ts` to deploy the contract
