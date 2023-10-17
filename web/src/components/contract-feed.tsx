"use client";

import { client } from "~/lib/react-query";
import { ContractCard } from "./contract-card";
import { Spinner } from "./spinner";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { motion, Variants } from "framer-motion";

const parentVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} satisfies Variants;

const childVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 10,
      stiffness: 100,
    },
  },
} satisfies Variants;

export function ContractsFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: contracts,
    status,
    error,
  } = client.getAllContracts.useQuery(
    ["contracts"],
    {},
    { refetchInterval: 1000 }
  );

  if (status === "loading") {
    return (
      <div className="flex items-center text-sm text-muted-foreground">
        <Spinner className="mr-2 h-4 w-4" />
        Loading...
      </div>
    );
  }

  if (status === "error") {
    return <div>Error: {error.status}</div>;
  }

  const filteredContracts = contracts?.body?.filter((contract) =>
    contract.contractAddress!.includes(searchTerm)
  );

  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
    >
      <Input
        type="text"
        placeholder="Search by contract hash"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredContracts?.map((contract) => (
        <motion.div layout key={contract.id} variants={childVariants}>
          <ContractCard
            name={contract.name!}
            createdAt={new Date(contract.createdAt!)}
            contractHistoryId={contract.contractHistoryId!}
            id={contract.id!}
            contractAddress={contract.contractAddress!}
            chainId={contract.chainId!}
            githubUrl={contract.githubUrl!}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
