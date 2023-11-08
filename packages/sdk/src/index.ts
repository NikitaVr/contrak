import "dotenv/config";
import * as util from "node:util";
import * as fs from "node:fs";
import * as ethers from "ethers";
import { createClient } from "@contrak/rest";
import { getCommitLink, getGitUsername } from "./git";

type ConnectOptions = {
  contractName: string;
  contractHistoryId: string;
  chainID: string;
  contractAddress: string;
  deployerAddress: string;
  contractDeploymentTransactionHash: string;
  orgPublicKey?: string;
};

type ConnectOutput = {
  contractName: string;
  contractHistoryId: string;
  chainID: string;
  contractAddress: string;
  deployerAddress: string;
  contractDeploymentTransactionHash: string;
  message: string;
  orgPublicKey?: string;
  deployerSignature?: string;
  orgSignature?: string;
  githubUrl?: string;
  gitUsername?: string;
};

type ConnectConfig = {
  verbose?: boolean;
};

type VerifyOptions = {
  message: string;
  signature: string;
  //   contractDeploymentTransactionHash: string;
};

export async function connect(
  {
    contractName,
    contractHistoryId,
    chainID,
    contractAddress,
    deployerAddress,
    contractDeploymentTransactionHash,
    orgPublicKey,
  }: ConnectOptions,
  config?: ConnectConfig
) {
  // Should we add contractName to the signed data too?
  const messageData = {
    action: "connect",
    chainID: chainID,
    contractAddress: contractAddress,
    orgPublicKey: orgPublicKey,
  };

  // bas64 encode the message
  const message = Buffer.from(JSON.stringify(messageData)).toString("base64");

  let deployerSignature: string | undefined = undefined;

  // public key is 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 for private key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
  const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;

  if (deployerPrivateKey) {
    const signer = new ethers.ethers.Wallet(deployerPrivateKey);
    deployerSignature = await signer.signMessage(message);
  }

  let orgSignature: string | undefined = undefined;

  const orgPrivateKey = process.env.TEAM_PRIVATE_KEY;
  if (orgPrivateKey) {
    const teamSigner = new ethers.ethers.Wallet(orgPrivateKey);
    orgSignature = await teamSigner.signMessage(message);
  }

  const githubUrl = getCommitLink();
  const gitUsername = await getGitUsername();

  const output = {
    contractName: contractName,
    contractHistoryId,
    chainID: chainID,
    contractAddress: contractAddress,
    deployerAddress: deployerAddress,
    contractDeploymentTransactionHash,
    orgPublicKey: orgPublicKey,
    message: message,
    deployerSignature: deployerSignature,
    orgSignature: orgSignature,
    githubUrl: githubUrl,
    gitUsername: gitUsername,
  } satisfies ConnectOutput;

  // write output to file
  fs.writeFileSync("output.json", JSON.stringify(output, null, 2));

  // log output file location
  //   console.log("output file location: ", __dirname + "/output.json");

  // send output to server
  sendToServer(output, config);
  console.log("Contrak: Contract Connected");
}

export async function verify({ message, signature }: VerifyOptions) {
  const signer = ethers.ethers.verifyMessage(message, signature);

  console.log(`Signer: ${signer}`);
}

async function sendToServer(
  connectResult: ConnectOutput,
  config?: ConnectConfig
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
        deployerAddress: connectResult.deployerAddress,
        deployerSignature: connectResult.deployerSignature,
        orgPublicKey: connectResult.orgPublicKey,
        orgSignature: connectResult.orgSignature,
        githubUrl: connectResult.githubUrl,
        gitUsername: connectResult.gitUsername,
        message: connectResult.message,
      },
    });
    console.log("Sent Contract Details to: ", process.env.CONTRAK_API_URL);
    if (config?.verbose) {
      console.log(
        "Create Contract Response",
        util.inspect(response.body, {
          showHidden: false,
          depth: null,
          colors: true,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}
