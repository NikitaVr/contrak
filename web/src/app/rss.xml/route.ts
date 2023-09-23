import { getAllContracts } from "@midna/db";
import { NextResponse } from "next/server";
import Rss from "rss";

const SITE_URL = "http://localhost:3000";

export async function GET() {
  const contracts = await getAllContracts();

  const feed = new Rss({
    title: "Midna RSS Feed",
    description: "Midna RSS Feed",
    feed_url: `${SITE_URL}/rss.xml`,
    site_url: SITE_URL,
    language: "en",
  });

  contracts.forEach((contract) => {
    feed.item({
      title: contract.name,
      description: contract.name,
      url: `${SITE_URL}/api/contracts/${contract.id}`,
      guid: `${contract.id}`,
      date: contract.createdAt,
    });
  });

  return new NextResponse(feed.xml(), {
    headers: {
      "content-type": "application/xml",
    },
  });
}
