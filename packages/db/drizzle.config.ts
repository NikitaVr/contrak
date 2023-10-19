import "dotenv/config";

import type { Config } from "drizzle-kit";
import { raise } from "@contrak/utils";

const sqliteConfig = {
  schema: "./src/sqlite/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? raise("DATABASE_URL is not set"),
  },
} satisfies Config;

const pgConfig = {
  schema: "./src/postgres/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ?? raise("DATABASE_URL is not set"),
  },
} satisfies Config;

const config = (() => {
  if (process.env.DATABASE_URL?.startsWith("postgres://")) {
    return pgConfig;
  }

  return sqliteConfig;
})();

export default config;
