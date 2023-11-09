import { DateTime } from "luxon";
import { client } from "~/lib/react-query";

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

  console.log(contract);

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
      </div>
    </>
  );
}
