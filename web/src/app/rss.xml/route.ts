import { getAllContracts } from "@midna/db";
import { NextResponse } from "next/server";
import Rss from "rss";

const SITE_URL = process.env.SITE_URL ?? "https://midna.io";

export const revalidate = 0;

export const dynamic = "force-dynamic";

export async function GET() {
  const contracts = await getAllContracts();

  const feed = new Rss({
    title: "Midna RSS Feed",
    description: "Midna RSS Feed",
    feed_url: `${SITE_URL}/rss.xml`,
    site_url: SITE_URL,
    language: "en",
    ttl: 5,
  });

  contracts.forEach((contract) => {
    const midnaUrl = new URL(
      `/contracts/history/${contract.contractHistoryId}?contractId=${contract.id}`,
      SITE_URL
    ).toString();
    const etherscanUrl = new URL(
      `/address/${contract.contractAddress}`,
      `https://etherscan.io`
    ).toString();
    const title = `Deployed ${contract.name} on ${contract.chainId}`;
    const description = `<p><b>Deployer:</b> ${
      contract.deployerAddress ?? "Unknown"
    }</p><br /><p><b>Contract Address:</b> ${
      contract.contractAddress
    }</p><br /><p><b>Transaction Hash:</b> ${
      contract.deploymentTransactionHash
    }</p><br /><p><a href="${midnaUrl}">View on Midna</a> | <a href="${etherscanUrl}">Open contract on Etherscan</a></p>`;
    feed.item({
      title,
      description,
      url: midnaUrl,
      guid: `${contract.id}`,
      date: contract.createdAt,
      author: contract.deployerAddress ?? "Unknown",
    });
  });

  return new NextResponse(feed.xml(), {
    headers: {
      "content-type": "application/xml",
    },
  });
}
