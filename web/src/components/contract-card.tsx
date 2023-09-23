import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
  BarChartIcon,
  LapTimerIcon,
  GitHubLogoIcon,
  CodeIcon,
} from "@radix-ui/react-icons";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function ContractCard() {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_min-content] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="leading-tight">
            Morpho Proxy (transparentUpgradableProxy)
          </CardTitle>
          <CardDescription>
            This contract implements a proxy that is upgradeable by an admin.
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <CodeIcon className="mr-2 h-4 w-4" />
            ABI
          </Button>
          <Button>
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-orange-400 text-orange-400" />
            Solidity
          </div>
          <div className="flex items-center">
            <LapTimerIcon className="mr-1 h-3 w-3" />
            20k tx/s
          </div>
          <div>Deployed April 5, 2023</div>
        </div>
      </CardContent>
    </Card>
  );
}
