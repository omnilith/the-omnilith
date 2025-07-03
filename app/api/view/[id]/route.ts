import { loadEntitiesWithView } from "@core/core/actions";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const entities = loadEntitiesWithView(id);
  return NextResponse.json(entities, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
