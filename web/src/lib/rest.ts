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

  getAllContracts: async () => {
    const contracts = await db.getAllContracts();

    return {
      status: 200,
      body: contracts,
    };
  },

  getContractsByHistory: async (args) => {
    if (!args.params.historyId) throw new Error("Missing history id");
    const contracts = await db.getContractsByHistory(args.params.historyId);

    return {
      status: 200,
      body: contracts,
    };
  },

  getContract: async (args) => {
    if (!args.params.id) throw new Error("Missing contract id");
    const contract = await db.getContractById(args.params.id);

    return {
      status: 200,
      body: contract,
    };
  },
});
