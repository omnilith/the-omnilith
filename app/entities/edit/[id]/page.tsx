import { getEntityById } from "@lib/persistence/entityService";
import { loadFormWithResolvedSchema } from "@lib/queries/loadFormWithFields";
import { EntityEditor } from "@world/components/EntityEditor";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function Page({ params }: PageProps) {
  const { id } = await params;
  const entity = await getEntityById(id);
  if (!entity) {
    return <div>Entity not found.</div>;
  }
  const { form, fields } = await loadFormWithResolvedSchema(
    "form-" + entity.type
  );
  return (
    <div>
      <EntityEditor
        form={form}
        fields={fields}
        initialEssence={entity.essence}
        id={entity.id}
      />
    </div>
  );
}

export default Page;
