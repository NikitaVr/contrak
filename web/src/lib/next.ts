import { contract } from "@contrak/rest";
import { initClient } from "@ts-rest/core";

export const client = initClient(contract, {
  baseUrl: new URL("/api", process.env.NEXT_PUBLIC_SITE_URL).toString(),
  baseHeaders: {
    "Content-Type": "application/json",
  },
});
