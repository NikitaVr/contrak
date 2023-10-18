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

// function extractData(text: string): {
//   deployer: string;
//   deployedTo: string;
//   transactionHash: string;
// } {
//   const deployerRegex = /Deployer: (\w+)/;
//   const deployedToRegex = /Deployed to: (\w+)/;
//   const transactionHashRegex = /Transaction hash: (\w+)/;

//   const deployerMatch = text.match(deployerRegex);
//   const deployedToMatch = text.match(deployedToRegex);
//   const transactionHashMatch = text.match(transactionHashRegex);

//   if (!deployerMatch || !deployedToMatch || !transactionHashMatch) {
//     throw new Error("Could not extract data from text");
//   }

//   return {
//     deployer: deployerMatch[1],
//     deployedTo: deployedToMatch[1],
//     transactionHash: transactionHashMatch[1],
//   };
// }

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
      description: "Name of the deployed contract",
      required: true,
    }),
    chainID: Args.string({
      description: "ID of the Chain that the contract is deployed on",
      required: true,
    }),
    orgPublicKey: Args.string({
      description: "Public Key of the Organization that owns the contract",
      required: true,
    }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Connect);

    // console.log("args", args);

    const pipeString = await readPipe();

    if (pipeString) {
      // blah blah blah
      console.log("PIPED", pipeString);

      const forgeOutput = parsePipe(pipeString);

      console.log("forgeOutput", forgeOutput);

      connect({
        contractName: args.contractName,
        contractHistoryId: args.contractName, //CONTRACT_HISTORY_ID,
        chainID: args.chainID,
        contractAddress: forgeOutput.deployedTo,
        contractDeploymentTransactionHash: forgeOutput.transactionHash,
        //contractDeployer: forgeOutput.deployer,
        orgPublicKey: args.orgPublicKey,
      });
    } else {
      // blah blah blah
      console.log("NO PIPE");
    }
  }
}
