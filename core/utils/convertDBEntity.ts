export interface DBEntity {
  id: string;
  type: string;
  essence: Record<string, unknown>;
}

export interface AppEntity extends Record<string, unknown> {
  id: string;
  type: string;
}

export function convertDBtoAppEntity(dbEntity: DBEntity): AppEntity {
  return {
    id: dbEntity.id,
    type: dbEntity.type,
    ...dbEntity.essence,
  };
}

export function convertAppToDBEntity(appEntity: AppEntity): DBEntity {
  const { id, type, ...essence } = appEntity;
  return {
    id,
    type,
    essence,
  };
}

export function convertDBtoAppEntities(dbEntities: DBEntity[]): AppEntity[] {
  return dbEntities.map(convertDBtoAppEntity);
}

export function convertAppToDBEntities(appEntities: AppEntity[]): DBEntity[] {
  return appEntities.map(convertAppToDBEntity);
}
