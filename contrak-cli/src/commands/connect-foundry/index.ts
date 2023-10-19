import { Args, Command } from "@oclif/core";
import { connect, verify } from "@contrak/sdk";
import "dotenv/config";

const readPipe: () => Promise<string | undefined> = () => {
  return new Promise((resolve) => {
    const stdin = process.openStdin();
    stdin.setEncoding("utf-8");

    let data = "";
    stdin.on("data", (chunk) => {
      data += chunk;
    });

    stdin.on("end", () => {
      resolve(data);
    });

    if (stdin.isTTY) {
      resolve("");
    }
  });
};

const parsePipe = (
  pipeString: string,
): {
  deployer: string;
  deployedTo: string;
  transactionHash: string;
} => {
  // json parse the string
  const data = JSON.parse(pipeString);
  // return the object
  return data;
};

export default class Connect extends Command {
  static description =
    "Sign a message that says a contract belongs to an organization";

  static examples = [];

  static flags = {};

  static args = {
    contractName: Args.string({
      name: "contractName",
      description: "Name of the deployed contract",
      required: true,
    }),
    chainID: Args.string({
      name: "chainID",
      description: "ID of the Chain that the contract is deployed on",
      required: true,
    }),
    orgPublicKey: Args.string({
      name: "orgPublicKey",
      description:
        "Public Key of the Organization that owns the contract (optional)",
      required: false,
    }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Connect);

    const pipeString = await readPipe();

    if (pipeString) {
      const forgeOutput = parsePipe(pipeString);

      console.log("forgeOutput", forgeOutput);

      connect({
        contractName: args.contractName,
        contractHistoryId: args.contractName, //CONTRACT_HISTORY_ID,
        chainID: args.chainID,
        contractAddress: forgeOutput.deployedTo,
        contractDeploymentTransactionHash: forgeOutput.transactionHash,
        deployerAddress: forgeOutput.deployer,
        orgPublicKey: args.orgPublicKey,
      });
    } else {
      // blah blah blah
      console.log("NO PIPE");
    }
  }
}
