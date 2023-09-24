"use client";

import { client } from "~/lib/react-query";
import { ContractCard } from "./contract-card";
import { Spinner } from "./spinner";
import { useState } from "react";
import { Input } from "~/components/ui/input";

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
    contract.contractAddress.includes(searchTerm)
  );

  return (
    <>
      <Input
        type="text"
        placeholder="Search by contract hash"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredContracts?.map((contract) => (
        <ContractCard
          key={contract.id}
          name={contract.name}
          createdAt={new Date(contract.createdAt)}
          contractHistoryId={contract.contractHistoryId}
          id={contract.id}
          contractAddress={contract.contractAddress}
          chainId={contract.chainId}
          githubUrl={contract.githubUrl}
        />
      ))}
    </>
  );
}
