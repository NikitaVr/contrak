import { Args, Command } from "@oclif/core";
import { ethers } from "ethers";
const fs = require("fs");
import "dotenv/config";

export default class Connect extends Command {
  static description =
    "Sign a message that says a contract belongs to an organization";

  static examples = [];

  static flags = {};

  static args = {
    chainID: Args.string({
      description: "ID of the Chain that the contract is deployed on",
      required: true,
    }),
    contractAddress: Args.string({
      description:
        "Address of the Contract that will be owned by the organization",
      required: true,
    }),
    contractDeploymentTransactionHash: Args.string({
      description:
        "Transaction Hash that deployed the contract that will be owned by the organization",
      required: true,
    }),
    orgPublicKey: Args.string({
      description: "Public Key of the Organization that owns the contract",
      required: true,
    }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Connect);

    const messageData = {
      action: "connect",
      chainID: args.chainID,
      contractAddress: args.contractAddress,
      orgPublicKey: args.orgPublicKey,
    };

    // const message = JSON.stringify(messageData);
    // bas64 encode the message
    const message = Buffer.from(JSON.stringify(messageData)).toString("base64");

    console.log("message: ", message);

    console.log("env private key", process.env.DEPLOYER_PRIVATE_KEY);

    // public key is 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 for private key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
    const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;
    if (!deployerPrivateKey) {
      throw new Error("Private key not found in environment variables");
    }

    const signer = new ethers.Wallet(deployerPrivateKey);
    const signature = await signer.signMessage(message);

    // const recoveredSigner = ethers.verifyMessage(message, signature);

    console.log(`Signed message: ${message}`);
    console.log(`Signature: ${signature}`);
    // console.log(`Recovered signer: ${recoveredSigner}`);

    let teamSignature = null;

    const teamPrivateKey = process.env.TEAM_PRIVATE_KEY;
    if (teamPrivateKey) {
      const teamSigner = new ethers.Wallet(teamPrivateKey);
      teamSignature = await teamSigner.signMessage(message);
    }

    const output = {
      chainID: args.chainID,
      contractAddress: args.contractAddress,
      orgPublicKey: args.orgPublicKey,
      message: message,
      deployerSignature: signature,
      teamSignature: teamSignature,
    };

    // write output to file
    fs.writeFileSync("output.json", JSON.stringify(output));

    // log output file location
    console.log("output file location: ", __dirname + "/output.json");
  }
}
