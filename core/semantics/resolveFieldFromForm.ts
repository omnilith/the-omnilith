import { resolveEntityReferences } from "./resolveEntityReferences";
import { Entity } from "@core/entities/entityTypes";

export function resolveFieldsFromForm(
  form: Entity,
  allEntities: Entity[]
): Entity[] {
  const fieldRefs = form.essence.fields;
  if (!Array.isArray(fieldRefs))
    throw new Error("form.essence.fields is not an array");

  return resolveEntityReferences(fieldRefs, allEntities);
}
