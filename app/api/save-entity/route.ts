import { createEntity, updateEntity } from "@lib/persistence/entityService";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Entity } from "@core/entities/entityTypes";

function generateId(type: string, essence: Entity["essence"]): string {
  let titlePart = "";
  if (essence?.title) {
    titlePart =
      typeof essence.title === "string"
        ? `-${essence.title.replace(/\s+/g, "-").toLowerCase()}`
        : "";
  } else if (essence?.key) {
    titlePart = `-${essence.key}`;
  }
  return type.toLowerCase() + titlePart + "-" + uuidv4();
}

export async function POST(req: Request) {
  const body = await req.json();
  const now = new Date().toISOString();

  try {
    if (body.id) {
      const entity = {
        type: body.type,
        essence: body.essence,
        updatedAt: now,
      };
      await updateEntity(body.id, entity);
      return NextResponse.json({ success: true, updated: true });
    } else {
      const id = generateId(body.type, body.essence);
      const entity = {
        id,
        type: body.type,
        essence: body.essence,
        createdAt: now,
        updatedAt: now,
      };
      await createEntity(entity);
      return NextResponse.json({ success: true, created: true });
    }
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
