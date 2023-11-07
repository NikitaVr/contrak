import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import * as schema from "./schema.js";

export const createContractSchema = createInsertSchema(schema.contracts);
export type CreateContractSchemaType = z.infer<typeof createContractSchema>;
