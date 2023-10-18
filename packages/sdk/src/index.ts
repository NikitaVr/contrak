import "dotenv/config";
import axios from "axios";
import util from "util";

import * as fs from "node:fs";
import * as ethers from "ethers";
import { createClient } from "@contrak/rest";
import { getChainName } from "@contrak/utils";
import { getCommitLink } from "./git";

type ConnectOptions = {
  contractName: string;
  contractHistoryId: string;
  chainID: string;
  contractAddress: string;
  contractDeploymentTransactionHash: string;
  orgPublicKey: string;
};

type ConnectOutput = {
  contractName: string;
  contractHistoryId: string;
  chainID: string;
  contractAddress: string;
  contractDeploymentTransactionHash: string;
  orgPublicKey: string;
  message: string;
  deployerSignature: string;
  orgSignature: string | null;
  githubUrl: string | undefined;
};

type VerifyOptions = {
  message: string;
  signature: string;
  //   contractDeploymentTransactionHash: string;
};

async function notifyWeb3Inbox(connectResult: ConnectOutput) {
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

  // const contractExplorerUrl = getExplorerUrl(
  //   connectResult.chainID,
  //   connectResult.contractAddress
  // );

  const contrakUrl = process.env.CONTRAK_URL;

  // 2. Send a notification to all your subscribers
  const body = JSON.stringify({
    accounts: subscribers,
    notification: {
      title: `Contract Deployed - ${connectResult.contractName}`,
      body: `${
        connectResult.contractAddress
      } Deployed by Contrak Team to chain ${getChainName(
        connectResult.chainID
      )} - ${connectResult.chainID}`,
      icon: "https://avatars.githubusercontent.com/u/37784886?s=48&v=4",
      url: `${contrakUrl}/contracts/history/${connectResult.contractHistoryId}?contractAddress=${connectResult.contractAddress}`,
      type: "alerts",
    },
  });

  const notifyRes = await axios.post(
    `https://notify.walletconnect.com/${projectId}/notify`,
    body,
    { headers }
  );
  const result = await notifyRes.data;
}

export async function connect({
  contractName,
  contractHistoryId,
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

  const githubUrl = getCommitLink();

  const output = {
    contractName: contractName,
    contractHistoryId,
    chainID: chainID,
    contractAddress: contractAddress,
    contractDeploymentTransactionHash,
    orgPublicKey: orgPublicKey,
    message: message,
    deployerSignature: signature,
    orgSignature: orgSignature,
    githubUrl: githubUrl,
  };

  // write output to file
  fs.writeFileSync("output.json", JSON.stringify(output, null, 2));

  notifyWeb3Inbox(output);

  // log output file location
  //   console.log("output file location: ", __dirname + "/output.json");

  // send output to server
  sendToServer(output, signer);
  console.log("Contrak: Contract Connected");
}

export async function verify({ message, signature }: VerifyOptions) {
  const signer = ethers.ethers.verifyMessage(message, signature);

  console.log(`Signer: ${signer}`);
}

async function sendToServer(
  connectResult: ConnectOutput,
  signer: ethers.ethers.Wallet
) {
  try {
    const client = createClient({ baseUrl: process.env.CONTRAK_API_URL });
    const response = await client.createContract({
      body: {
        name: connectResult.contractName,
        contractHistoryId: connectResult.contractHistoryId,
        chainId: connectResult.chainID,
        contractAddress: connectResult.contractAddress,
        deploymentTransactionHash:
          connectResult.contractDeploymentTransactionHash,
        deployerAddress: signer.address,
        deployerSignature: connectResult.deployerSignature,
        orgPublicKey: connectResult.orgPublicKey,
        orgSignature: connectResult.orgSignature,
        githubUrl: connectResult.githubUrl,
        message: connectResult.message,
      },
    });
    console.log("Sent Contract Details to: ", process.env.CONTRAK_API_URL);
    // console.log(
    //   "Create Contract Response",
    //   util.inspect(response.body, {
    //     showHidden: false,
    //     depth: null,
    //     colors: true,
    //   })
    // );
  } catch (error) {
    console.log(error);
  }
}
