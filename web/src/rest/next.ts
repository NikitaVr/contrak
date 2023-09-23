import { createNextRoute } from "@ts-rest/next";
import { contract } from "./contract";
import * as db from "~/db";

export const router = createNextRoute(contract, {
  createContract: async (args) => {
    const newContract = await db.createContract(args.body);

    return {
      status: 201,
      body: newContract,
    };
  },
  getContract: async (args) => {
    const contract = await db.getContractById(args.params.id);

    return {
      status: 200,
      body: contract,
    };
  },
});
