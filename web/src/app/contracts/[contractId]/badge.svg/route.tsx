import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { makeBadge, ValidationError } from "badge-maker";
import { client } from "~/lib/next";

const paramsSchema = z.object({
  contractId: z.coerce.number(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { contractId: string } }
) {
  const { contractId } = paramsSchema.parse(params);
  const res = await client.getContract({ params: { id: contractId } });

  if (res.status !== 200 || !res.body) {
    return new Response("Not found", { status: 404 });
  }

  const contract = res.body;

  try {
    const svg = makeBadge({
      label: contract.name,
      message: contract.contractAddress,
      color: "black",
      style: "flat",
    });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return new NextResponse(e.message, { status: 400 });
    } else {
      return new NextResponse(
        "An unexpected error occured while generating the badge",
        { status: 500 }
      );
    }
  }
}
