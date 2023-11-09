"use client";

import { DateTime } from "luxon";
import { client } from "~/lib/react-query";

function createBadgeUrl(contractId: number) {
  return new URL(
    `/contracts/${contractId}/badge.svg`,
    process.env.NEXT_PUBLIC_SITE_URL
  ).href;
}

function createMarkdownBadge({
  contractId,
  contractAddress,
  contractName,
}: {
  contractId: number;
  contractAddress: string;
  contractName: string;
}) {
  return `[![${contractName} - ${contractAddress}](${createBadgeUrl(
    contractId
  )})](${
    new URL(`/contracts/${contractId}`, process.env.NEXT_PUBLIC_SITE_URL).href
  })`;
}

export function ContractDetails({ id }: { id: number }) {
  const { data } = client.getContract.useQuery(
    ["getContract", id],
    { params: { id } },
    { suspense: true }
  );

  if (!data || !data.body) {
    return <div>Contract not found</div>;
  }

  const contract = data.body;
  const badgeUrl = createBadgeUrl(contract.id);
  const markdownBadge = createMarkdownBadge({
    contractId: contract.id,
    contractAddress: contract.contractAddress,
    contractName: contract.name,
  });

  return (
    <>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {contract.name}
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Address</span>
            <span className="text-sm">{contract.contractAddress}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Deployer</span>
            <span className="text-sm">{contract.gitUsername}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Created at</span>
            <span className="text-sm">
              {DateTime.fromISO(contract.createdAt).toRelative()}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">ABI</span>
          <div className="text-sm whitespace-pre-wrap">TODO</div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Badge</span>
          <span>
            <img src={badgeUrl} alt="Contract badge" />
          </span>
          <code className="text-sm bg-gray-100 p-4 rounded text-gray-800 break-all">
            {markdownBadge}
          </code>
        </div>
      </div>
    </>
  );
}
