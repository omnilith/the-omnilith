import { getEntityById } from "@lib/persistence/entityService";
import { resolveFieldsFromForm } from "@core/semantics/resolveFieldFromForm";
import { Entity } from "@core/entities/entityTypes";

export async function loadFormWithFields(formId: string) {
  const form = await getEntityById(formId);
  if (!form) throw new Error(`Form with ID ${formId} not found`);

  interface FormEssenceWithFields {
    fields: string[];
    [key: string]: unknown;
  }

  if (
    !form.essence ||
    !Array.isArray((form.essence as FormEssenceWithFields).fields)
  ) {
    throw new Error(`Form essence fields are missing or not an array`);
  }

  const allFields: Entity[] = (
    await Promise.all(
      (form.essence as { fields: string[] }).fields.map((id) =>
        getEntityById(id)
      )
    )
  ).filter((field): field is Entity => field !== null);

  const fields = resolveFieldsFromForm(form, allFields);

  return { form, fields };
}
