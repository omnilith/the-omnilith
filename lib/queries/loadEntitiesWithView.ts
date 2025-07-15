"use server";

import { getEntityById } from "@lib/persistence/entityService";
import { getEntitiesByType } from "@lib/persistence/entityService";
import { Entity } from "@core/entities/entityTypes";
import { resolveEntityReferences } from "@core/semantics/resolveEntityReferences";

//TODO: Move required from FieldDefinition to fields in Form

export const loadEntitiesWithView = async (
  viewId: string,
  entityId?: string
) => {
  const view = await getEntityById(viewId);
  if (!view) {
    throw new Error(`View with ID ${viewId} not found`);
  }
  const allFields: Entity[] = (
    await Promise.all(
      (view.essence as { fields: string[] }).fields.map((id) =>
        getEntityById(id)
      )
    )
  ).filter((field): field is Entity => field !== null);

  if (
    "targetEntityType" in view.essence &&
    typeof view.essence.targetEntityType === "string"
  ) {
    if (entityId) {
      const entity = await getEntityById(entityId);
      if (!entity) {
        throw new Error(
          `Entity with ID ${entityId} not found in targetEntity ${view.essence.targetEntityType}`
        );
      }
      return { entities: [entity], view };
    }
    const entities = await getEntitiesByType(view.essence.targetEntityType);

    const resolvedEntities = resolveEntityReferences(
      view.essence.fields as string[],
      allFields
    );

    const resolvedFields = (view.essence.fields as string[]).map(
      (fieldId) =>
        resolvedEntities.find((entity) => entity.id === fieldId) || fieldId
    );
    view.essence.fields = resolvedFields;

    return { entities, view };
  } else {
    throw new Error(
      `View with ID ${viewId} does not have a targetEntity property`
    );
  }
};
