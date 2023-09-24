import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const contracts = sqliteTable("contracts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  contractHistoryId: text("contract_history_id").notNull(),
  chainId: text("chain_id").notNull(),
  contractAddress: text("contract_address").notNull(),
  deployerAddress: text("deployer_address"),
  deploymentTransactionHash: text("deployment_transaction_hash"),
  orgPublicKey: text("org_public_key"),
  message: text("message"),
  deployerSignature: text("deployer_signature"),
  orgSignature: text("org_signature"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  githubUrl: text("github_url"),
});
