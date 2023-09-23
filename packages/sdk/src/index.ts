import "dotenv/config";
import axios from "axios";

import * as fs from "node:fs";
import * as ethers from "ethers";

import * as etherscanLink from "@metamask/etherscan-link";

type ConnectOptions = {
  contractName: string;
  chainID: string;
  contractAddress: string;
  contractDeploymentTransactionHash: string;
  orgPublicKey: string;
};

type ConnectOutput = {
  contractName: string;
  chainID: string;
  contractAddress: string;
  contractDeploymentTransactionHash: string;
  orgPublicKey: string;
  message: string;
  deployerSignature: string;
  orgSignature: string | null;
};

type VerifyOptions = {
  message: string;
  signature: string;
  //   contractDeploymentTransactionHash: string;
};

async function notifyWeb3Inbox(connectResult: ConnectOutput) {
  console.log("notifyWeb3Inbox");
  // Your project ID from WalletConnect Cloud
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  // notify_api_secret generated in WalletConnect Cloud
  const notifyApiSecret = process.env.NOTIFY_API_SECRET;

  if (!projectId || !notifyApiSecret) {
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${notifyApiSecret}`,
  };

  // 1. Get the list of subscribers for your project
  const subscribersRes = await axios.get(
    `https://notify.walletconnect.com/${projectId}/subscribers`,
    { headers }
  );
  const subscribers = await subscribersRes.data;

  const contractExplorerUrl = etherscanLink.createExplorerLink(
    connectResult.contractAddress,
    connectResult.chainID
  );

  console.log("contractExplorerUrl", contractExplorerUrl);

  // 2. Send a notification to all your subscribers
  const body = JSON.stringify({
    accounts: subscribers,
    notification: {
      title: `Contract Deployed - ${connectResult.contractName}`,
      body: `Midna Team`,
      icon: "https://avatars.githubusercontent.com/u/37784886?s=48&v=4",
      url: contractExplorerUrl,
      type: "promotional",
    },
  });

  const notifyRes = await axios.post(
    `https://notify.walletconnect.com/${projectId}/notify`,
    body,
    { headers }
  );
  const result = await notifyRes.data;
  console.log(result);
}

export async function connect({
  contractName,
  chainID,
  contractAddress,
  contractDeploymentTransactionHash,
  orgPublicKey,
}: ConnectOptions) {
  // Should we add contractName to the signed data too?
  const messageData = {
    action: "connect",
    chainID: chainID,
    contractAddress: contractAddress,
    orgPublicKey: orgPublicKey,
  };

  // bas64 encode the message
  const message = Buffer.from(JSON.stringify(messageData)).toString("base64");

  // public key is 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 for private key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
  const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;
  if (!deployerPrivateKey) {
    throw new Error("Private key not found in environment variables");
  }

  const signer = new ethers.ethers.Wallet(deployerPrivateKey);
  const signature = await signer.signMessage(message);

  let orgSignature: string | null = null;

  const orgPrivateKey = process.env.TEAM_PRIVATE_KEY;
  if (orgPrivateKey) {
    const teamSigner = new ethers.ethers.Wallet(orgPrivateKey);
    orgSignature = await teamSigner.signMessage(message);
  }

  const output = {
    contractName: contractName,
    chainID: chainID,
    contractAddress: contractAddress,
    contractDeploymentTransactionHash,
    orgPublicKey: orgPublicKey,
    message: message,
    deployerSignature: signature,
    orgSignature: orgSignature,
  };

  // write output to file
  fs.writeFileSync("output.json", JSON.stringify(output, null, 2));

  notifyWeb3Inbox(output);

  // log output file location
  //   console.log("output file location: ", __dirname + "/output.json");
}

export async function verify({ message, signature }: VerifyOptions) {
  const signer = ethers.ethers.verifyMessage(message, signature);

  console.log(`Signer: ${signer}`);
}
