import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import * as schema from "./schema";

const databasePath = process.env.DATABASE_URL ?? "sqlite://../../../data.db";

const sqlite = new Database(databasePath);

export const db = drizzle(sqlite, { schema });
