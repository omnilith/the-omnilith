import { Entity } from "./entityTypes";

export interface EntityRepository {
  getById(id: string): Promise<Entity | null>;
  getByType(type: string): Promise<Entity[]>;
  create(entity: Entity): Promise<void>;
  update(id: string, data: Partial<Entity>): Promise<void>;
  delete(id: string): Promise<void>;
}
