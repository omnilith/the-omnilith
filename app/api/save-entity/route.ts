import { createEntity, updateEntity } from "@lib/persistence/entityService";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const body = await req.json();

  let entity;
  if (body.id) {
    entity = {
      type: body.type,
      essence: body.essence,
      updatedAt: new Date().toISOString(),
    };
    try {
      await updateEntity(body.id, entity);
      return NextResponse.json({ success: true, updated: true });
    } catch (err) {
      return NextResponse.json({ error: err as Error }, { status: 500 });
    }
  } else {
    entity = {
      id: body.type.toLowerCase() + "-" + uuidv4(),
      type: body.type,
      essence: body.essence,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      await createEntity(entity);
      return NextResponse.json({ success: true, created: true });
    } catch (err) {
      return NextResponse.json(
        { error: (err as Error).message },
        { status: 500 }
      );
    }
  }
}
