import { eq } from "drizzle-orm";

import * as schema from "./schema";
import { db } from "./db";
import { CreateContractSchemaType } from "./zod";

export async function getAllContracts() {
  return db.select().from(schema.contracts);
}

export async function getContractById(id: number) {
  const [first] = await db
    .select()
    .from(schema.contracts)
    .where(eq(schema.contracts.id, id));
  return first;
}

export async function createContract(contract: CreateContractSchemaType) {
  const [row] = await db
    .insert(schema.contracts)
    .values({
      name: contract.name,
      chainId: contract.chainId,
      contractAddress: contract.contractAddress,
      deployerAddress: contract.deployerAddress,
      deploymentTransactionHash: contract.deploymentTransactionHash,
      orgPublicKey: contract.orgPublicKey,
      message: contract.message,
      deployerSignature: contract.deployerSignature,
      orgSignature: contract.orgSignature,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  return row;
}
