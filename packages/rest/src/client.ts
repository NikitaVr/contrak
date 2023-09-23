import { initClient } from "@ts-rest/core";
import { contract } from "./contract";

///"https://midna.io/api"

const client = initClient(contract, {
  baseUrl: process.env.MIDNA_API_URL || "http://localhost:3000/api",
  baseHeaders: {
    "Content-Type": "application/json",
  },
});

export { client };
