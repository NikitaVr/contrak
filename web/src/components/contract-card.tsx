import {
  CircleIcon,
  CodeIcon,
  GitHubLogoIcon,
  LapTimerIcon,
} from "@radix-ui/react-icons";
import { DateTime } from "luxon";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Spacer } from "./ui/spacer";

export function ContractCard({
  name,
  createdAt,
}: {
  name: string;
  createdAt: Date;
}) {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_min-content] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="leading-tight">{name}</CardTitle>
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
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-orange-400 text-orange-400" />
            Solidity
          </div>
          <div className="flex items-center">
            <LapTimerIcon className="mr-1 h-3 w-3" />
            20k tx/s
          </div>
          <Spacer />
          <div>
            Deployed{" "}
            <strong className="text-accent-foreground font-medium">
              {DateTime.fromJSDate(createdAt).toFormat("LLL dd yyyy @ HH:mm")}
            </strong>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
