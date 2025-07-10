import { loadFormWithFields } from "@lib/queries/loadFormWithFields";
import { EntityEditor } from "@world/components/EntityEditor";

type PageProps = {
  params: { id: string };
};

async function Page({ params }: PageProps) {
  const { id } = await params;
  const { form, fields } = await loadFormWithFields(id);
  return (
    <div>
      <EntityEditor form={form} fields={fields} />
    </div>
  );
}

export default Page;
