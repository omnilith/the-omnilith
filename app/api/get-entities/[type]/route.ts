import { getEntitiesByType } from "@lib/persistence/entityService";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const entities = await getEntitiesByType(type);
  return NextResponse.json(entities, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
