import { desc, eq } from "drizzle-orm";

// UNCOMMENT FOR SQLITE
// import { db } from "./sqlite/db";
// import * as schema from "./sqlite/schema";

// UNCOMMENT FOR POSTGRES
import { db } from "./postgres/db";
import * as schema from "./postgres/schema";

import { CreateContractSchemaType } from "./sqlite/zod";

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
  const [first] = await db
    .select()
    .from(schema.contracts)
    .where(eq(schema.contracts.id, id));
  return first;
}

export async function createContract(
  contract: Omit<CreateContractSchemaType, "createdAt">
) {
  const [row] = await db
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
      createdAt: new Date(),
    })
    .returning();
  return row;
}
