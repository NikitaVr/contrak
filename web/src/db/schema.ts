import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const contracts = sqliteTable(
  "contracts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    contractAddress: text("contract_address"),
    deployerAddress: text("deployer_address"),
    deploymentTransactionHash: text("deployment_transaction_hash"),
    createdAt: integer("created_at", { mode: "timestamp" }),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
  },
  (contracts) => ({
    nameIdx: uniqueIndex("nameIdx").on(contracts.name),
  })
);
