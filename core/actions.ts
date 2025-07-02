import { getEntityById } from "./persistence/getEntityById";
import { getAllEntities } from "./persistence/getAllEntities";

export const loadEntitiesWithView = async (
  viewId: string,
  entityId?: string
) => {
  const view = await getEntityById("View", viewId);
  if (!view) {
    throw new Error(`View with ID ${viewId} not found`);
  }
  if ("targetEntity" in view && typeof view.targetEntity === "string") {
    if (entityId) {
      const entity = getEntityById(view.targetEntity, entityId);
      if (!entity) {
        throw new Error(
          `Entity with ID ${entityId} not found in targetEntity ${view.targetEntity}`
        );
      }
      return { entities: [entity], view };
    }
    const entities = await getAllEntities(
      view.targetEntity as "Form" | "Blog" | "View"
    );
    return { entities, view };
  } else {
    throw new Error(
      `View with ID ${viewId} does not have a targetEntity property`
    );
  }
};
