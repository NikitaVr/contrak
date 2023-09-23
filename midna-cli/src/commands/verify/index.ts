import { Args, Command } from "@oclif/core";
import { ethers } from "ethers";
import { verify } from "midna-sdk";

export default class Verify extends Command {
  static description =
    "Sign a message that says a contract belongs to an organization";

  static examples = [];

  static flags = {};

  static args = {
    message: Args.string({
      description: "The raw message",
      required: true,
    }),
    signature: Args.string({
      description: "The signature of the message",
      required: true,
    }),
    transactionHash: Args.string({
      description: "The transaction hash where the contract was deployed",
      required: true,
    }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Verify);

    verify({
      message: args.message,
      signature: args.signature,
      // transactionHash: args.transactionHash,
    });
  }
}
