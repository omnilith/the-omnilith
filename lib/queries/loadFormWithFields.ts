import { getEntityById } from "@lib/persistence/entityService";
import { Entity } from "@core/entities/entityTypes";
import { resolveFormFields } from "@core/semantics/resolveFormFields";
import { ResolvedFormField } from "@core/entities/entityTypes";

export async function loadFormWithResolvedSchema(
  formId: string,
  depth = 0,
  maxDepth = 2
): Promise<{ form: Entity; fields: ResolvedFormField[] }> {
  if (depth > maxDepth) {
    throw new Error("Max sub-form depth exceeded");
  }

  const form = await getEntityById(formId);
  if (!form) throw new Error(`Form with ID ${formId} not found`);

  const rawFields = form.essence?.fields;
  if (!Array.isArray(rawFields)) {
    throw new Error(`Form essence.fields must be an array`);
  }

  // Support both strings and { id, required } objects
  type FormFieldRef = string | { id: string; required?: boolean };

  const fieldIds: string[] = rawFields.map((f: FormFieldRef) =>
    typeof f === "string" ? f : f.id
  );

  const fieldDefs: Entity[] = (
    await Promise.all(fieldIds.map(getEntityById))
  ).filter((e): e is Entity => e !== null);

  const subFormIds = fieldDefs
    .filter((f) => f.essence?.type === "sub-form")
    .map((f) => f.essence?.form)
    .filter((id): id is string => typeof id === "string");

  const subForms: Entity[] = (
    await Promise.all(subFormIds.map(getEntityById))
  ).filter((e): e is Entity => e !== null);

  const subFormMap: Record<string, Entity> = {};

  for (const subForm of subForms) {
    const resolved = await loadFormWithResolvedSchema(
      subForm.id,
      depth + 1,
      maxDepth
    );
    subForm._resolvedFields = resolved.fields;
    subFormMap[subForm.id] = subForm;
  }

  const resolvedFields = resolveFormFields(form, [
    ...fieldDefs,
    ...subForms,
  ]).map((field): ResolvedFormField => {
    const fieldDef = field.field;
    const subFormId =
      fieldDef.essence?.type === "sub-form"
        ? (fieldDef.essence.form as string)
        : undefined;

    const resolvedSubForm = subFormId ? subFormMap[subFormId] : undefined;

    return {
      field: fieldDef,
      required: field.required,
      ...(resolvedSubForm && { resolvedSubForm }),
    };
  });

  return {
    form,
    fields: resolvedFields,
  };
}
