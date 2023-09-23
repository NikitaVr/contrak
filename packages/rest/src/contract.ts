import { createContractSchema } from "@midna/db/src/zod";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const ContractSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  contractHistoryId: z.string(),
});

export const contract = c.router({
  createContract: {
    method: "POST",
    path: "/contracts",
    responses: {
      201: ContractSchema,
    },
    body: createContractSchema.omit({
      id: true,
      createdAt: true,
    }),
    summary: "Create a contract",
  },
  getAllContracts: {
    method: "GET",
    path: "/contracts",
    responses: {
      200: z.array(ContractSchema),
    },
    summary: "Get all contracts",
  },
  getContractsByHistory: {
    method: "GET",
    path: "/contracts/history/:historyId",
    pathParams: z.object({
      historyId: z.string(),
    }),
    responses: {
      200: z.array(ContractSchema),
    },
    summary: "Get all contracts associated to the same history id.",
  },
  getContract: {
    method: "GET",
    path: `/contracts/:id`,
    pathParams: z.object({
      id: z.coerce.number(),
    }),
    responses: {
      200: ContractSchema.nullable(),
    },
    summary: "Get a contract by id",
  },
});
