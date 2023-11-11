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

const getLatestContracts = (allContracts: any[]) => {
  // Create a new map to store the latest contract for each contract_history_id
  const latestContractsMap = new Map();

  // Iterate over each contract
  allContracts.forEach((contract) => {
    // If the contract_history_id is not in the map, or if the current contract is later than the one in the map
    if (
      !latestContractsMap.has(contract.contractHistoryId) ||
      new Date(contract.createdAt) >
        new Date(latestContractsMap.get(contract.contractHistoryId).createdAt)
    ) {
      // Update the map entry for the contract_history_id with the current contract
      latestContractsMap.set(contract.contractHistoryId, contract);
    }
  });

  // Convert the values of the map to an array and return this array
  const latestList = Array.from(latestContractsMap.values());

  return latestList;
};

export function ContractsFeed() {
  // Add state variable for latestOnly
  const [latestOnly, setLatestOnly] = useState(false);

  // Add toggle function
  const toggleLatestOnly = () => {
    setLatestOnly(!latestOnly);
  };
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

  let filteredContracts =
    contracts?.body &&
    (latestOnly ? getLatestContracts(contracts.body) : contracts.body);

  filteredContracts = filteredContracts.filter(
    (contract) =>
      contract.contractAddress!.includes(searchTerm) ||
      contract.name.toLowerCase().includes(searchTerm)
  );
  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={latestOnly}
          onChange={toggleLatestOnly}
          className="mr-2"
        />
        <label>Show only latest contracts</label>
      </div>
      <Input
        type="text"
        placeholder="Search by contract hash or name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredContracts?.map((contract) => (
        <motion.div layout key={contract.id} variants={childVariants}>
          <ContractCard
            name={contract.name!}
            createdAt={new Date(contract.createdAt)}
            contractHistoryId={contract.contractHistoryId}
            id={contract.id!}
            contractAddress={contract.contractAddress}
            deployerAddress={contract.deployerAddress}
            chainId={contract.chainId}
            githubUrl={contract.githubUrl}
            gitUsername={contract.gitUsername}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
