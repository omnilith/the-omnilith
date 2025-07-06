import { Entity } from "@core/core/entities/entityTypes";

// Supabase DB shape
export interface DBEntity {
  id: string;
  type: string;
  essence: Record<string, unknown>;
  created_at: string;
  updated_at?: string;
}

// App model shape
export function convertDBtoAppEntity(db: DBEntity): Entity {
  return {
    id: db.id,
    type: db.type,
    essence: db.essence,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  };
}

export function convertAppToDBEntity(
  app: Entity
): Omit<DBEntity, "created_at" | "updated_at"> {
  return {
    id: app.id,
    type: app.type,
    essence: app.essence,
  };
}
