"use server";

import { getEntityById } from "@lib/persistence/entityService";
import { getEntitiesByType } from "@lib/persistence/entityService";

export const loadEntitiesWithView = async (
  viewId: string,
  entityId?: string
) => {
  const view = await getEntityById(viewId);
  if (!view) {
    throw new Error(`View with ID ${viewId} not found`);
  }
  if (
    "targetEntity" in view.essence &&
    typeof view.essence.targetEntity === "string"
  ) {
    if (entityId) {
      const entity = await getEntityById(entityId);
      if (!entity) {
        throw new Error(
          `Entity with ID ${entityId} not found in targetEntity ${view.essence.targetEntity}`
        );
      }
      return { entities: [entity], view };
    }
    const entities = await getEntitiesByType(
      view.essence.targetEntity as "Form" | "Post" | "View"
    );
    return { entities, view };
  } else {
    throw new Error(
      `View with ID ${viewId} does not have a targetEntity property`
    );
  }
};
