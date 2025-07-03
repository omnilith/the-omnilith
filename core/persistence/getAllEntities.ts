import { supabase } from "../utils/supabase";
import { entities } from "../data/entities";
import { convertDBtoAppEntities } from "../utils/convertDBEntity";

export const getAllEntities = async <T extends keyof typeof entities>(
  type: T
) => {
  const { data, error } = await supabase
    .from("entity")
    .select("*")
    .eq("type", type);

  if (error) throw new Error(error.message);
  return convertDBtoAppEntities(data);
};
