import { ContractCard } from "~/components/contract-card";
import { ModeToggle } from "~/components/theme-mode-toggle";

export default function Home() {
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
          <div className="absolute top-0 right-0">
            <ModeToggle />
          </div>
        </div>

        <section className="w-full flex flex-col gap-4">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Contracts
          </h2>
          <ContractCard />
          <ContractCard />
          <ContractCard />
          <ContractCard />
        </section>
      </div>
    </main>
  );
}
