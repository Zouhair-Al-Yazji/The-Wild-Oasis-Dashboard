import type { User } from "@/features/authentication/users/useUser";
import supabase, { supabaseUrl } from "@/services/supabase";

export async function signup({ fullName, email, password, gender }: User) {
  const username = generateUsername(fullName);

  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: getDefaultAvatar(gender, username),
        gender,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.user) {
    throw new Error("User creation failed - no user data returned");
  }

  await createUserProfile({
    id: data.user.id,
    email: data.user?.email,
    avatar: data.user?.user_metadata.avatar,
    created_at: data.user?.created_at,
    fullName: data.user?.user_metadata.fullName,
    gender: data.user?.user_metadata.gender,
  });

  return data;
}

function generateUsername(fullName: string) {
  return (
    fullName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 20) || "user"
  );
}

function getDefaultAvatar(gender: string, username: string) {
  return `https://avatar.iran.liara.run/public/${gender}?username=${username}`;
}

type UserProfileParams = {
  id: string;
  fullName: string;
  gender: string;
  email?: string;
  avatar?: string;
  created_at?: string;
};

export async function createUserProfile({
  email,
  gender,
  fullName,
  avatar,
  id,
  created_at,
}: UserProfileParams) {
  const { error } = await supabase.from("profiles").insert({
    id,
    fullName,
    gender,
    avatar,
    email,
    created_at,
  });

  if (error) throw new Error(error.message);
}

export async function login({
  password,
  email,
}: {
  password: string;
  email: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getUsers() {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from("profiles").delete().eq("id", id);

  if (error) throw error;
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("User not authorized");

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File;
}) {
  // 1. Update password or fullName
  const updateData: {
    password?: string;
    data?: {
      fullName?: string;
      avatar?: string;
    };
  } = {};

  if (password) updateData.password = password;
  if (fullName) updateData.data = { ...updateData.data, fullName };

  const { data: authData, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) {
    await updateProfilesTable(authData.user.id, { fullName });
    return authData;
  }

  // 2. Upload the avatar image
  const fileName = `avatar-${authData.user.id}-${Date.now()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar, {
      cacheControl: "3600",
      upsert: true,
    });

  if (storageError) {
    throw new Error(storageError.message);
  }

  // 3. Update avatar user
  const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
  const { data: updatedUser, error: updatedUserError } =
    await supabase.auth.updateUser({
      data: {
        ...updateData.data,
        avatar: avatarUrl,
      },
    });

  if (updatedUserError) throw new Error(updatedUserError.message);

  await updateProfilesTable(updatedUser.user.id, {
    fullName: fullName || updatedUser.user.user_metadata?.fullName,
    avatar: avatarUrl,
  });

  return updatedUser;
}

export async function updateProfilesTable(
  userId: string,
  updates: { fullName?: string; avatar?: string },
) {
  const { error } = await supabase
    .from("profiles")
    .update({
      fullName: updates.fullName,
      avatar: updates.avatar,
    })
    .eq("id", userId);

  if (error)
    throw new Error(`Failed to update profiles table: ${error.message}`);
}
