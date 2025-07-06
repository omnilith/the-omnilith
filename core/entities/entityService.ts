import { entityRepo } from "@core/lib/persistence/entityRepo";
import { Entity } from "./entityTypes";

export const getEntityById = (id: string) => {
  return entityRepo.getById(id);
};

export const getEntitiesByType = (type: string) => {
  return entityRepo.getByType(type);
};

export const createEntity = (entity: Entity) => {
  return entityRepo.create(entity);
};

export const updateEntity = (id: string, data: Partial<Entity>) => {
  return entityRepo.update(id, data);
};

export const deleteEntity = (id: string) => {
  return entityRepo.delete(id);
};
