"use client";

import { client } from "~/lib/react-query";
import { ContractCard } from "./contract-card";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your Selected Contract is not the most recent
      </AlertDescription>
    </Alert>
  );
}

export function ContractsHistory({ historyId }: { historyId: string }) {
  const searchParams = useSearchParams();

  const selectedContractId = searchParams?.get("contractId");
  const selectedContractAddress = searchParams?.get("contractAddress");

  const {
    data: contracts,
    status,
    error,
  } = client.getContractsByHistory.useQuery(
    ["contractsByHistory"],
    {
      params: {
        historyId: historyId,
      },
    },
    { refetchInterval: 1000 }
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.status}</div>;
  }

  const selectedContract = contracts.body?.find(
    (contract) =>
      contract.id.toString() === selectedContractId ||
      contract.contractAddress === selectedContractAddress
  );

  const firstContractId = contracts.body?.[0]?.id;
  const isMostRecent = selectedContract?.id === firstContractId;

  return (
    <>
      {firstContractId && selectedContractId && !isMostRecent && (
        <AlertDestructive />
      )}
      {contracts?.body?.map((contract) => (
        <ContractCard
          key={contract.id}
          name={contract.name}
          createdAt={new Date(contract.createdAt)}
          contractHistoryId={contract.contractHistoryId}
          id={contract.id}
          contractAddress={contract.contractAddress}
          chainId={contract.chainId}
          selected={selectedContract?.id === contract.id}
          githubUrl={contract.githubUrl}
        />
      ))}
    </>
  );
}
