import { entities } from "../data/entities";

type EntityType = keyof typeof entities;

export const getEntityById = (type: string, id: string) => {
  if (!(type in entities)) return null;
  const entity = entities[type as EntityType]?.find(
    (entity) => entity.id === id
  );
  return entity || null;
};
