import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import { desc, eq } from "drizzle-orm";
import SQLiteDatabase from "better-sqlite3";
import { raise } from "@contrak/utils";

import * as schema from "./schema";
export class Database {
  private db: BetterSQLite3Database<typeof schema>;

  constructor(databasePath: string) {
    const sqlite = new SQLiteDatabase(databasePath);
    this.db = drizzle(sqlite, { schema });
  }

  async getAllContracts() {
    return this.db
      .select()
      .from(schema.contracts)
      .orderBy(desc(schema.contracts.createdAt));
  }

  async getContractsByHistory(historyId: string) {
    return this.db
      .select()
      .from(schema.contracts)
      .where(eq(schema.contracts.contractHistoryId, historyId))
      .orderBy(desc(schema.contracts.createdAt));
  }

  async getContractById(id: number) {
    const [first] = await this.db
      .select()
      .from(schema.contracts)
      .where(eq(schema.contracts.id, id));
    return first;
  }

  async createContract(
    contract: Omit<typeof schema.contracts.$inferInsert, "id" | "createdAt">
  ) {
    const [row] = await this.db
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
