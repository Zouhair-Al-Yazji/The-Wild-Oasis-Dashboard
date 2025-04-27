import type { Settings } from "@/features/settings/useSettings";
import supabase from "./supabase";

export async function getSettings(): Promise<Settings> {
  const { data: settings, error } = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded!");
  }

  return settings;
}

export async function updateSetting(newSetting: Settings): Promise<Settings> {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    console.error("Full error details:", error);
    console.log("Attempted update with:", newSetting);
    throw new Error("Settings could not be updated!");
  }

  return data;
}
