import { loadEntitiesWithView } from "@core/core/actions";
import BlogListRenderer from "@core/world/components/BlogListRenderer";
import BlogDetailRenderer from "@core/world/components/BlogDetailRenderer";
import { BlogType } from "@core/core/data/entities";

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

  const Renderer = rendererMap[view.rendererComponent as RendererKey];
  if (!Renderer) {
    throw new Error(`No renderer found for view type: ${view.id}`);
  }

  return (
    <div>
      <Renderer entities={entities as unknown as BlogType[]} />
    </div>
  );
}

export default page;
