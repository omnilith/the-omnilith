import { loadEntitiesWithView } from "@lib/queries/loadEntitiesWithView";
import BlogListRenderer from "@world/components/BlogListRenderer";
import BlogDetailRenderer from "@world/components/BlogDetailRenderer";
import { ListRenderer } from "@world/components/ListRenderer";
// import { BlogType } from "@core/core/data/entities";
import { Entity } from "@core/entities/entityTypes";

type RendererKey = keyof typeof rendererMap;

const rendererMap = {
  BlogsListRenderer: BlogListRenderer,
  BlogDetailRenderer: BlogDetailRenderer,
  // Add other renderers as needed
};

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { entityId } = (await searchParams) as {
    entityId: string | undefined;
  };
  const { entities, view } = await loadEntitiesWithView(id, entityId);

  if (view.essence.layout === "list") {
    return (
      <div>
        <ListRenderer view={view} entities={entities as Entity[]} />
      </div>
    );
  }

  const Renderer = rendererMap[view.essence.rendererComponent as RendererKey];
  if (!Renderer) {
    throw new Error(`No renderer found for view type: ${view.id}`);
  }

  return (
    <div>
      <Renderer entities={entities as unknown as Entity[]} />
    </div>
  );
}

export default page;
