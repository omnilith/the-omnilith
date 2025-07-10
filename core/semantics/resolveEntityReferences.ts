import { Entity } from "@core/entities/entityTypes";

/**
 * Resolve an array of reference IDs against a set of known entities.
 * @param refs Array of entity IDs (strings)
 * @param allEntities Full list of loaded entities
 */
export function resolveEntityReferences<T extends Entity = Entity>(
  refs: string[],
  allEntities: T[]
): T[] {
  return refs.map((refId) => {
    const entity = allEntities.find((e) => e.id === refId);
    if (!entity) throw new Error(`Missing referenced entity: ${refId}`);
    return entity;
  });
}
