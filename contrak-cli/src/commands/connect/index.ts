import { Args, Command } from "@oclif/core";
import { connect, verify } from "@contrak/sdk";
import "dotenv/config";

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

    connect({
      contractName: args.contractName,
      contractHistoryId: args.contractName, //CONTRACT_HISTORY_ID,
      chainID: args.chainID,
      contractAddress: args.contractAddress,
      contractDeploymentTransactionHash: args.contractDeploymentTransactionHash,
      orgPublicKey: args.orgPublicKey,
    });
  }
}
