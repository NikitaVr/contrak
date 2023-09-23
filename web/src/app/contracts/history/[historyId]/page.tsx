'use client'

import { ContractsFeed } from "~/components/contract-feed";
import { ModeToggle } from "~/components/theme-mode-toggle";
import { Button } from "~/components/ui/button";
import { RssIcon } from "lucide-react";
import Link from "next/link";
import { ContractsHistory } from "~/components/contract-history";
import { useParams } from "next/navigation";

export default function Home() {
    const params = useParams()

    if(!params) {
        return <div>Invalid URL</div>
    }

  return (
    <main className="py-16">
      <div className="px-4 mx-auto w-full max-w-screen-md flex flex-col items-start gap-8">
        <div className="relative w-full flex flex-col gap-4 items-start">
          <Link href="/">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Midna
            </h1>
          </Link>
          <p className="leading-7 [&:not(:first-child)]:mt-2">
            Keep track of your contracts and get notified when new ones are
            deployed.
          </p>

          <Button asChild>
            <Link href="/rss.xml">
              <RssIcon className="w-4 h-4 mr-2" />
              Subscribe to RSS
            </Link>
          </Button>

          <div className="absolute top-0 right-0">
            <ModeToggle />
          </div>
        </div>

        <section className="w-full flex flex-col gap-4">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            History
          </h2>
          <ContractsHistory historyId={params.historyId as string} />
        </section>
      </div>
    </main>
  );
}
