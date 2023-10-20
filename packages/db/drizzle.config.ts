import "dotenv/config";

import type { Config } from "drizzle-kit";
import { raise, iife } from "@contrak/utils";

const config = iife(() => {
  switch (process.env.DATABASE_TYPE) {
    case "sqlite": {
      const sqliteConfig = {
        schema: "./src/sqlite/schema.ts",
        driver: "better-sqlite",
        dbCredentials: {
          url: process.env.DATABASE_URL ?? raise("DATABASE_URL is not set"),
        },
      } satisfies Config;

      return sqliteConfig;
    }

    case "postgres": {
      const pgConfig = {
        schema: "./src/postgres/schema.ts",
        driver: "pg",
        dbCredentials: {
          connectionString:
            process.env.DATABASE_URL ?? raise("DATABASE_URL is not set"),
        },
      } satisfies Config;

      return pgConfig;
    }

    default: {
      raise("DATABASE_TYPE is not set");
    }
  }
});

export default config;
