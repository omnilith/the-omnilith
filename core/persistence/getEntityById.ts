import { createClient } from "../utils/supabase";
import { convertDBtoAppEntity } from "../utils/convertDBEntity";

export const getEntityById = async (id: string) => {
  const supabase = createClient(); // 👈 call it *inside* the function
  const { data, error } = await supabase
    .from("entity")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  return convertDBtoAppEntity(data);
};
