import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq } from "drizzle-orm";

import * as schema from "./schema";

const sqlite = new Database("sqlite.db");
const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, { schema });

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
