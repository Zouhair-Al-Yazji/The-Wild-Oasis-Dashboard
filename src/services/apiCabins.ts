import supabase, { supabaseUrl } from "./supabase";
import type { Cabin } from "@/features/cabins/useCabins";

export async function getCabins(): Promise<Cabin[]> {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  return cabins;
}

export async function createUpdateCabin(
  newCabin: Cabin,
  id?: number,
): Promise<Cabin> {
  // Check if image is already uploaded (has full URL)
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  // Generate image name if it's a new file
  let imageName: string | undefined;
  let imageFile: File | null = null;

  if (!hasImagePath && typeof newCabin.image !== "string") {
    // Get the first file from FileList
    imageFile = newCabin.image[0];
    imageName = `${Math.random()}-${imageFile.name.replace("/", "-")}`;
  }

  // Generate image path if it's a new file
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1- create/update cabin
  let query;
  let operationType: "create" | "update";

  if (!id) {
    operationType = "create";
    query = supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();
  } else {
    operationType = "update";
    query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);

    const errorMessage =
      operationType === "create"
        ? "Cabin could not be created!"
        : "Cabin could not be updated!";

    throw new Error(errorMessage);
  }

  // If image is already uploaded, return early
  if (hasImagePath) return data;

  // Only upload if imageName exists and we have a file to upload
  if (imageName && imageFile) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, imageFile);

    if (storageError) {
      console.error(storageError);

      // Rollback cabin creation if image upload fails
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error(
        "Image could not be uploaded and the cabin was not created!",
      );
    }
  }

  return data;
}

export async function deleteCabin(id: number): Promise<Cabin | null> {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted!");
  }

  return data;
}
