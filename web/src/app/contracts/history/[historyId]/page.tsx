"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ContractsHistory } from "~/components/contract-history";
import { ModeToggle } from "~/components/theme-mode-toggle";
import { Button } from "~/components/ui/button";

export default function Home() {
  const params = useParams();

  if (!params) {
    return <div>Invalid URL</div>;
  }

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
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Deployment History
          </h2>
          <ContractsHistory historyId={params.historyId as string} />
        </section>
      </div>
    </main>
  );
}
