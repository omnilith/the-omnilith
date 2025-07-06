import { Entity } from "@core/entities/entityTypes";

export function resolveFieldsFromForm(
  form: Entity,
  allEntities: Entity[]
): Entity[] {
  if (!Array.isArray(form.essence.fields)) {
    throw new Error("form.essence.fields is not an array");
  }
  return form.essence.fields.map((ref) => {
    const match = allEntities.find((e) => e.id === ref);
    if (!match) throw new Error(`Missing field: ${ref}`);
    return match;
  });
}
