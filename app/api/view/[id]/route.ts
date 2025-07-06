import { loadEntitiesWithView } from "@lib/queries/loadEntitiesWithView";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const entities = await loadEntitiesWithView(id);
  return NextResponse.json(entities, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
