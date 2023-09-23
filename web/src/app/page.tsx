import { ContractCard } from "~/components/contract-card";
import { ModeToggle } from "~/components/theme-mode-toggle";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <ModeToggle />
      <div className="w-[400px]">
        <ContractCard />
      </div>
    </div>
  );
}
