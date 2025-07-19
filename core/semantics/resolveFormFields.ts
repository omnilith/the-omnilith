import { Entity } from "@core/entities/entityTypes";

export interface ResolvedFormField {
  field: Entity;
  required: boolean;
  resolvedSubForm?: Entity;
}

export function resolveFormFields(
  form: Entity,
  allEntities: Entity[]
): ResolvedFormField[] {
  const rawFields = form.essence?.fields;
  if (!Array.isArray(rawFields)) {
    throw new Error(`Form essence.fields must be an array`);
  }

  const resolved: ResolvedFormField[] = [];

  for (const entry of rawFields) {
    const fieldId = typeof entry === "string" ? entry : entry?.id;
    const required =
      typeof entry === "object" && "required" in entry ? entry.required : false;

    if (!fieldId) {
      throw new Error(`Malformed FormField entry: ${JSON.stringify(entry)}`);
    }

    const field = allEntities.find(
      (e) => e.id === fieldId && e.type === "FieldDefinition"
    );
    if (!field) {
      throw new Error(`Missing FieldDefinition: ${fieldId}`);
    }

    let resolvedSubForm: Entity | undefined = undefined;
    if (
      field.essence?.type === "sub-form" &&
      typeof field.essence.form === "string"
    ) {
      resolvedSubForm = allEntities.find(
        (e) => e.id === field.essence.form && e.type === "Form"
      );
    }

    resolved.push({
      field,
      required,
      ...(resolvedSubForm && { resolvedSubForm }),
    });
  }

  return resolved;
}
