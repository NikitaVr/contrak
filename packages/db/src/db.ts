import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import * as schema from "./schema.js";

const databasePath = process.env.DATABASE_URL ?? "../../data.db";

console.log("DATABASE PATH", databasePath);

const sqlite = new Database(databasePath);

export const db = drizzle(sqlite, { schema });
