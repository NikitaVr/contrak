# Contrak

Contrak helps teams track track their smart contract deployments.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/qc4V0T?referralCode=kMU60t)

## 🚀 Getting Started

### Deploying Contrak

1. Click the "Deploy on Railway" button above
2. Fill in the environment variables:

| Variable       | Description                                          |
| -------------- | ---------------------------------------------------- |
| `SITE_URL`     | Set this to `https://${{RAILWAY_PUBLIC_DOMAIN}}/`    |
| `DATABASE_URL` | Set this to `${{RAILWAY_VOLUME_MOUNT_PATH}}/data.db` |

4. Click "Deploy"

## 👷 Contributing

### Setup

1. Install Node 18 and Yarn
2. Run `yarn install`
3. Run `yarn db:push` to generate the database
4. Run `yarn build:web` to build all the sub packages
5. Run `yarn dev:web` to start the web server
6. Run `cd hardhat-example && npx hardhat node` to start the hardhat node
7. Run `npx hardhat run --network localhost scripts/deploy.ts` to deploy the contract

### Directory Structure

- `hardhat-example`: Contains a [Hardhat](https://hardhat.org/) project with a sample contract
- `contrak-cli`: Contains a Node.js CLI for interacting with Contrak
- `packages/db`: Contains the database schema using [Drizzle ORM](https://orm.drizzle.team/)
- `packages/rest`: Contains the REST API client for Contrak
- `packages/sdk`: Contains the TypeScript SDK for Contrak
- `packages/utils`: Contains utility functions used across the project
- `web`: Contains the Next.js web app for Contrak
- `web3inbox`: Contains an example deployment of [Web3Inbox](https://web3inbox.com/) with Contrak notifications
