import { initClient } from "@ts-rest/core";
import { contract } from "./contract";

const client = initClient(contract, {
  baseUrl: "https://midna.io/api",
  baseHeaders: {
    "Content-Type": "application/json",
  },
});

export { client };
