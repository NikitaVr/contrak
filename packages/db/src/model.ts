import { desc, eq } from "drizzle-orm";

import * as schema from "./schema.js";
import { db } from "./db.js";
import type { CreateContractSchemaType } from "./zod.js";

export async function getAllContracts() {
  return db
    .select()
    .from(schema.contracts)
    .orderBy(desc(schema.contracts.createdAt));
}

export async function getContractsByHistory(historyId: string) {
  return db
    .select()
    .from(schema.contracts)
    .where(eq(schema.contracts.contractHistoryId, historyId))
    .orderBy(desc(schema.contracts.createdAt));
}

export async function getContractById(id: number) {
  return db
    .select()
    .from(schema.contracts)
    .where(eq(schema.contracts.id, id))
    .get();
}

export async function createContract(
  contract: Omit<CreateContractSchemaType, "createdAt">
) {
  return db
    .insert(schema.contracts)
    .values({
      name: contract.name,
      chainId: contract.chainId,
      contractHistoryId: contract.contractHistoryId,
      contractAddress: contract.contractAddress,
      deployerAddress: contract.deployerAddress,
      deploymentTransactionHash: contract.deploymentTransactionHash,
      orgPublicKey: contract.orgPublicKey,
      message: contract.message,
      deployerSignature: contract.deployerSignature,
      orgSignature: contract.orgSignature,
      githubUrl: contract.githubUrl,
      gitUsername: contract.gitUsername,
      createdAt: new Date(),
    })
    .returning()
    .get();
}
