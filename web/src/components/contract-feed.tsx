"use client";

import { client } from "~/lib/react-query";
import { ContractCard } from "./contract-card";
import { Spinner } from "./spinner";

export function ContractsFeed() {
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

  return (
    <>
      {contracts?.body?.map((contract) => (
        <ContractCard
          key={contract.id}
          name={contract.name}
          createdAt={new Date(contract.createdAt)}
          contractHistoryId={contract.contractHistoryId}
          id={contract.id}
        />
      ))}
    </>
  );
}
