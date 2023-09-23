import * as db from "@midna/db";
import { contract } from "@midna/rest";
import { createNextRoute } from "@ts-rest/next";

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
