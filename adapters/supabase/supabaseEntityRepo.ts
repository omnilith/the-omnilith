import { createClient } from "./server";
import { EntityRepository } from "@core/entities/entityRepository";
import {
  convertDBtoAppEntity,
  convertAppToDBEntity,
  DBEntity,
} from "@lib/conversion/entityConverters";

export const supabaseEntityRepo: EntityRepository = {
  async getById(id) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("entity")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(error.message);
    }

    return convertDBtoAppEntity(data as DBEntity);
  },

  async getByType(type) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("entity")
      .select("*")
      .eq("type", type);

    if (error) throw new Error(error.message);
    return (data as DBEntity[]).map(convertDBtoAppEntity);
  },

  async create(entity) {
    const supabase = await createClient();
    const dbEntity = convertAppToDBEntity(entity);
    const { error } = await supabase.from("entity").insert(dbEntity);
    if (error) throw new Error(error.message);
  },

  async update(id, data) {
    const supabase = await createClient();

    const updateFields: Partial<DBEntity> = {
      ...(data.type && { type: data.type }),
      ...(data.essence && { essence: data.essence }),
      updated_at: new Date().toISOString(),
    };

    const { data: updated, error } = await supabase
      .from("entity")
      .update(updateFields)
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(error.message);
    }
    if (!updated || updated.length === 0) {
      throw new Error("No entity updated. Check if the ID exists.");
    }
  },

  async delete(id) {
    const supabase = await createClient();
    const { error } = await supabase.from("entity").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
