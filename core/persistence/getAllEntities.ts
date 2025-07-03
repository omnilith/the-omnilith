import { entities } from "../data/entities";
import { query } from "../db";
import { convertDBtoAppEntities } from "../utils/convertDBEntity";

export const getAllEntities = async <T extends keyof typeof entities>(
  type: T
) => {
  const rows = await query(`SELECT * FROM entity WHERE type = $1`, [type]);
  return convertDBtoAppEntities(rows);
};
