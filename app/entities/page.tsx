import { loadFormWithFields } from "@lib/queries/loadFormWithFields";
import { EntityEditor } from "@world/components/EntityEditor";

async function page() {
  const { form, fields } = await loadFormWithFields("form-Post");
  return (
    <div>
      <EntityEditor form={form} fields={fields} />
    </div>
  );
}

export default page;
