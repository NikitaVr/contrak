import { Database } from "@contrak/db";
import { contract as apiContract } from "@contrak/rest";
import { createNextRoute } from "@ts-rest/next";

export const router = createNextRoute(apiContract, {
  createContract: async (args) => {
    const newContract = await Database.fromEnv().createContract(args.body);

    return {
      status: 201,
      body: newContract,
    };
  },

  getAllContracts: async () => {
    const contracts = await Database.fromEnv().getAllContracts();

    return {
      status: 200,
      body: contracts,
    };
  },

  getContractsByHistory: async (args) => {
    const contracts = await Database.fromEnv().getContractsByHistory(
      args.params.historyId
    );

    return {
      status: 200,
      body: contracts,
    };
  },

  getContract: async (args) => {
    const contract = await Database.fromEnv().getContractById(args.params.id);

    return {
      status: 200,
      body: contract,
    };
  },
});
