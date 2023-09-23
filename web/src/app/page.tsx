import { client } from "@midna/rest";
import { ContractsFeed } from "~/components/contract-feed";
import { ModeToggle } from "~/components/theme-mode-toggle";
import { Button } from "~/components/ui/button";
import { RssIcon } from "lucide-react";

export default async function Home() {
  const contractsResponse = await client.getAllContracts({ cache: "no-cache" });

  if (contractsResponse.status !== 200) {
    return <div>Something went wrong</div>;
  }

  const contracts = contractsResponse.body;

  return (
    <main className="py-16">
      <div className="px-4 mx-auto w-full max-w-screen-md flex flex-col items-start gap-8">
        <div className="relative w-full flex flex-col gap-4 items-start">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Midna
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-2">
            Keep track of your contracts and get notified when new ones are
            deployed.
          </p>
          <Button>
            <RssIcon className="w-4 h-4 mr-2" />
            Subscribe to RSS
          </Button>

          <div className="absolute top-0 right-0">
            <ModeToggle />
          </div>
        </div>

        <section className="w-full flex flex-col gap-4">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Contracts
          </h2>
          <ContractsFeed initialData={contracts} />
        </section>
      </div>
    </main>
  );
}
