import { eq } from "drizzle-orm";

import * as schema from "./schema";
import { db } from "./db";

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

export async function createContract(body: { name: string }) {
  const [row] = await db
    .insert(schema.contracts)
    .values({
      name: body.name,
    })
    .returning();
  return row;
}
