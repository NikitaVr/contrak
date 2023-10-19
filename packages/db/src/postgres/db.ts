import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const databasePath = process.env.DATABASE_URL ?? "postgres://";

const pg = postgres(databasePath);

export const db = drizzle(pg, { schema });
