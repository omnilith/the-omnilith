import { getEntityById } from "../persistence/entityService";

export async function loadSongIdentityWithPrimary(id: string) {
  const identity = await getEntityById(id);
  if (!identity) throw new Error("SongIdentity not found");

  const primaryId = identity.essence.primaryVersion as string | undefined;
  const primaryVersion =
    typeof primaryId === "string" && primaryId.length > 0
      ? await getEntityById(primaryId)
      : null;

  return { identity, primaryVersion };
}
