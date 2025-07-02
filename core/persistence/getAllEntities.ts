import { entities } from "../data/entities";

export const getAllEntities = <T extends keyof typeof entities>(type: T) => {
  return entities[type].flatMap((entity) => entity);
};
