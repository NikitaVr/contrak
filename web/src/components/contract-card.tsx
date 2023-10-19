import {
  CircleIcon,
  CodeIcon,
  GitHubLogoIcon,
  ListBulletIcon,
  LapTimerIcon,
} from "@radix-ui/react-icons";
import { DateTime } from "luxon";
import { getExplorerUrl, getChainName } from "@contrak/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Spacer } from "./ui/spacer";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export function ContractCard({
  name,
  createdAt,
  contractHistoryId,
  id,
  contractAddress,
  deployerAddress,
  chainId,
  githubUrl,
  gitUsername,
  selected,
}: {
  name: string;
  createdAt: Date;
  contractHistoryId: string;
  id: number;
  contractAddress: string;
  deployerAddress: string;
  chainId: string;
  githubUrl?: string;
  gitUsername?: string;
  selected?: boolean;
}) {
  return (
    <Card className={selected ? "border-primary border-2" : undefined}>
      <CardHeader className="grid grid-cols-[1fr_min-content] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="leading-tight">{name}</CardTitle>
          <CardDescription>
            <div className="flex flex-col">
              Deployed to {getChainName(chainId)} - {chainId}
            </div>
            <div>
              Contract Address{" "}
              <Link
                href={getExplorerUrl(chainId, contractAddress)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contractAddress}
              </Link>
            </div>
            <div>
              Deployer Address{" "}
              <Link
                href={getExplorerUrl(chainId, deployerAddress)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {deployerAddress}
              </Link>
            </div>
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {chainId !== "31337" && (
            <Link
              href={getExplorerUrl(chainId, contractAddress)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">
                <CodeIcon className="mr-2 h-4 w-4" />
                Explorer
              </Button>
            </Link>
          )}
          {githubUrl && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      <GitHubLogoIcon className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Link To Commit Hash When This Contract Was Deployed</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={`/contracts/history/${contractHistoryId}?contractId=${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>
                    <ListBulletIcon className="mr-2 h-4 w-4" />
                    History
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Deployments of this Contract</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          {/* <Spacer /> */}

          <Link
            href={`/contracts/history/${contractHistoryId}?contractId=${id}`}
          >
            <strong className="text-accent-foreground font-medium">
              {gitUsername}
            </strong>{" "}
            deployed{" "}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <strong className="text-accent-foreground font-medium">
                    {DateTime.fromJSDate(createdAt).toRelative({
                      padding: 1000 * 60,
                    })}
                  </strong>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {DateTime.fromJSDate(createdAt).toFormat(
                      "LLL dd yyyy @ HH:mm"
                    )}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
