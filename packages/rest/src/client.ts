import { initClient } from "@ts-rest/core";
import { contract } from "./contract.js";

export function createClient(options: { baseUrl?: string } = {}) {
  const baseUrl = new URL(
    "/api",
    options.baseUrl ?? "http://localhost:3000"
  ).toString();
  return initClient(contract, {
    baseUrl,
    baseHeaders: {
      "Content-Type": "application/json",
    },
  });
}
