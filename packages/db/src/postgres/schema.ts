import { text, serial, pgTable, timestamp } from "drizzle-orm/pg-core";

export const contracts = pgTable("contracts", {
  id: serial("id").primaryKey(),
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
  createdAt: timestamp("created_at").notNull(),
  githubUrl: text("github_url"),
});
