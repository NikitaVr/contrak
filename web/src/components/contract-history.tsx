"use client";

import { client } from "~/lib/react-query";
import { ContractCard } from "./contract-card";
import { useSearchParams } from "next/navigation";



export function ContractsHistory({ historyId }: { historyId: string}) {
  const searchParams = useSearchParams()
 
  const search = searchParams?.get('contractId')

  const {
    data: contracts,
    status,
    error,
  } = client.getContractsByHistory.useQuery(
    ["contractsByHistory"],
    {
      params: {
        historyId: historyId
      }
    },
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
        />
      ))}
    </>
  );
}
