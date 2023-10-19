import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { raise } from "@contrak/utils";

import * as schema from "./schema";

const databasePath = process.env.DATABASE_URL ?? raise("DATABASE_URL not set");

const sqlite = new Database(databasePath);

export const db = drizzle(sqlite, { schema });
