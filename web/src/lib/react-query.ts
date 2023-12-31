import { contract } from "@contrak/rest";
import { initQueryClient } from "@ts-rest/react-query";

export const client = initQueryClient(contract, {
  baseUrl: new URL("/api", process.env.NEXT_PUBLIC_SITE_URL).toString(),
  baseHeaders: {
    "Content-Type": "application/json",
  },
});
