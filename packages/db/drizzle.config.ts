import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

console.log(process.env.DATABASE_URL);

export default {
  schema: "./src/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "../../data.db",
  },
} satisfies Config;
