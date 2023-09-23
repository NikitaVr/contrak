import { contract } from "@midna/rest";
import { initQueryClient } from "@ts-rest/react-query";

export const client = initQueryClient(contract, {
  baseUrl: "http://localhost:3000/api",
  baseHeaders: {
    "Content-Type": "application/json",
  },
});
