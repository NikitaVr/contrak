import { Args, Command } from "@oclif/core";
import { ethers } from "ethers";

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
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Verify);

    console.log(`Message: ${args.message}`);

    const message = `{"contractAddress":"0x1231231","orgPublicKey":"0x53243"}`;

    const signer = ethers.verifyMessage(message, args.signature);

    console.log(`Signer: ${signer}`);
  }
}
