"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { z } from "zod";
import { ContractDetails } from "~/components/contract-details";
import { Spinner } from "~/components/spinner";

import { ModeToggle } from "~/components/theme-mode-toggle";
import { Button } from "~/components/ui/button";

const paramsSchema = z.object({
  contractId: z.coerce.number(),
});

export default function ContractDetailsPage() {
  const params = useParams();

  if (!params) {
    return <div>Invalid URL</div>;
  }

  const { contractId } = paramsSchema.parse(params);

  return (
    <main className="py-16">
      <div className="px-4 mx-auto w-full max-w-screen-md flex flex-col items-start gap-8">
        <div className="relative w-full flex flex-col gap-4 items-start">
          <Button asChild variant="link" className="-mx-4">
            <Link href="/">
              <ArrowLeftIcon className="mr-2 w-4 h-4" />
              Back to feed
            </Link>
          </Button>

          <div className="absolute top-0 right-0">
            <ModeToggle />
          </div>
        </div>

        <section className="w-full flex flex-col gap-4">
          <Suspense fallback={<Spinner />}>
            <ContractDetails id={contractId} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
