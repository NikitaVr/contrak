import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { desc, eq } from "drizzle-orm";
import postgres from "postgres";
import { raise } from "@contrak/utils";

import * as schema from "./schema";

export class Database {
  private static db: PostgresJsDatabase<typeof schema>;

  private constructor(databasePath: string) {
    if (!Database.db) {
      const pg = postgres(databasePath);
      Database.db = drizzle(pg, { schema });
    }
  }

  async getAllContracts() {
    return Database.db
      .select()
      .from(schema.contracts)
      .orderBy(desc(schema.contracts.createdAt));
  }

  async getContractsByHistory(historyId: string) {
    return Database.db
      .select()
      .from(schema.contracts)
      .where(eq(schema.contracts.contractHistoryId, historyId))
      .orderBy(desc(schema.contracts.createdAt));
  }

  async getContractById(id: number) {
    const [first] = await Database.db
      .select()
      .from(schema.contracts)
      .where(eq(schema.contracts.id, id));
    return first;
  }

  async createContract(
    contract: Omit<typeof schema.contracts.$inferInsert, "id" | "createdAt">
  ) {
    const [row] = await Database.db
      .insert(schema.contracts)
      .values({
        ...contract,
        createdAt: new Date(),
      })
      .returning();
    return row;
  }

  static fromEnv() {
    const databasePath =
      process.env.DATABASE_URL ?? raise("DATABASE_URL not set");
    return new Database(databasePath);
  }
}
