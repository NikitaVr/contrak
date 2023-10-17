import { contract } from "@contrak/rest";
import { initQueryClient } from "@ts-rest/react-query";

export const client = initQueryClient(contract, {
  baseUrl: "/api",
  baseHeaders: {
    "Content-Type": "application/json",
  },
});
