import { createNextRouter } from "@ts-rest/next";
import { contract } from "~/rest/contract";
import { router } from "~/rest/next";

export default createNextRouter(contract, router);
