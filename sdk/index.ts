import { ethers } from "ethers";
const fs = require("fs");
import "dotenv/config";

type ConnectOptions = {
  contractName: string;
  chainID: string;
  contractAddress: string;
  contractDeploymentTransactionHash: string;
  orgPublicKey: string;
};

type VerifyOptions = {
  message: string;
  signature: string;
  //   contractDeploymentTransactionHash: string;
};

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

  const signer = new ethers.Wallet(deployerPrivateKey);
  const signature = await signer.signMessage(message);

  let orgSignature = null;

  const orgPrivateKey = process.env.TEAM_PRIVATE_KEY;
  if (orgPrivateKey) {
    const teamSigner = new ethers.Wallet(orgPrivateKey);
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

  // log output file location
  //   console.log("output file location: ", __dirname + "/output.json");
}

export async function verify({ message, signature }: VerifyOptions) {
  const signer = ethers.verifyMessage(message, signature);

  console.log(`Signer: ${signer}`);
}
