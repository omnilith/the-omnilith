// import { entities } from "../data/entities";
import { query } from "../db";
import { convertDBtoAppEntity } from "../utils/convertDBEntity";

// type EntityType = keyof typeof entities;

export const getEntityById = async (id: string) => {
  const rows = await query(`SELECT * FROM entity WHERE id = $1`, [id]);
  return rows.length > 0 ? convertDBtoAppEntity(rows[0]) : null;
};
