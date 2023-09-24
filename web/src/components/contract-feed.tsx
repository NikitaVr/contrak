"use client";

import { client } from "~/lib/react-query";
import { ContractCard } from "./contract-card";

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
    return <div>Loading...</div>;
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
          contractAddress={contract.contractAddress}
          chainId={contract.chainId}
        />
      ))}
    </>
  );
}
