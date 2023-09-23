import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const ContractSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const contract = c.router({
  createContract: {
    method: "POST",
    path: "/contracts",
    responses: {
      201: ContractSchema,
    },
    body: z.object({
      name: z.string(),
    }),
    summary: "Create a contract",
  },
  getContract: {
    method: "GET",
    path: `/contracts/:id`,
    pathParams: z.object({
      id: z.number(),
    }),
    responses: {
      200: ContractSchema.nullable(),
    },
    summary: "Get a contract by id",
  },
});
