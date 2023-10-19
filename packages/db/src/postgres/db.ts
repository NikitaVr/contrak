import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { raise } from "@contrak/utils";

import * as schema from "./schema";

const databasePath = process.env.DATABASE_URL ?? raise("DATABASE_URL not set");

const pg = postgres(databasePath);

export const db = drizzle(pg, { schema });
