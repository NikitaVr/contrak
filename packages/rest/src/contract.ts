import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const ContractSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  contractHistoryId: z.string(),
  contractAddress: z.string(),
  deploymentTransactionHash: z.string().nullable(),
  deployerAddress: z.string().nullable(),
  chainId: z.string(),
  githubUrl: z.string().nullable(),
  gitUsername: z.string().nullable(),
  deployerSignature: z.string().nullable(),
  orgPublicKey: z.string().nullable(),
  orgSignature: z.string().nullable(),
  message: z.string().nullable(),
});

const CreateContractSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  contractHistoryId: z.string(),
  contractAddress: z.string(),
  deploymentTransactionHash: z.string(),
  deployerAddress: z.string(),
  chainId: z.string(),
  githubUrl: z.string().optional(),
  gitUsername: z.string().optional(),
  deployerSignature: z.string().optional(),
  orgPublicKey: z.string().optional(),
  orgSignature: z.string().optional(),
  message: z.string(),
});

export const contract = c.router({
  createContract: {
    method: "POST",
    path: "/contracts",
    responses: {
      201: ContractSchema,
    },
    body: CreateContractSchema,
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
