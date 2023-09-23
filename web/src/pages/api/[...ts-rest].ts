import { createNextRouter } from "@ts-rest/next";
import { contract } from "@midna/rest";
import { router } from "~/lib/rest";

export default createNextRouter(contract, router);
