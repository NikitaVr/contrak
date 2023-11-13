<h1 align="center">Contrak</h1>
<p align="center">
  <strong>Contrak</strong> is a dead-simple tool to keep track of your smart contract deployments and keep your docs up-to-date. 
</p>
<p align="center">
  Every time you deploy, your deployment artifacts are uploaded to Contrak, and we auto-generate a Web UI and RSS feed that you can share with your team.
</p>

<p align="center"> 
  <a href="https://railway.app/template/qc4V0T?referralCode=kMU60t">
    <img src="https://railway.app/button.svg" alt="Deploy on Railway" />
  </a>
</p>

![CleanShot 2023-11-13 at 18 36 16@2x](https://github.com/NikitaVr/contrak/assets/8302959/a69d2486-5041-44cf-9538-70f24c06e480)

## 🚀 Getting Started

### Deploying Contrak

1. Click the "Deploy on Railway" button above
2. Fill in the environment variables:

| Variable               | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Set this to `https://${{RAILWAY_PUBLIC_DOMAIN}}/`    |
| `DATABASE_URL`         | Set this to `${{RAILWAY_VOLUME_MOUNT_PATH}}/data.db` |

4. Click "Deploy"

## 👷 Contributing

### Setup

1. Install Node 18 and Yarn
2. Run `cp .env.example .env` and fill in any missing environment variables
3. Run `yarn install`
4. Run `yarn db:push` to generate the database
5. Run `yarn build:sdk` to build the SDK package
6. Run `yarn dev:web` to start the web server
7. Run `yarn dev:cli` to run the CLI to deploy a contract

### Directory Structure

- `web`: Contains the Next.js web app for Contrak
- `cli`: Contains a Node.js CLI for interacting with Contrak
- `packages/db`: Contains the database schema using [Drizzle ORM](https://orm.drizzle.team/)
- `packages/rest`: Contains the REST API client for Contrak
- `packages/sdk`: Contains the TypeScript SDK for Contrak
- `packages/utils`: Contains utility functions used across the project
