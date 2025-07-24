import type { User } from "@/features/authentication/users/useUser";
import supabase, { supabaseAdmin, supabaseUrl } from "@/services/supabase";

export async function signup({ fullName, email, password, gender }: User) {
  const username =
    fullName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 20) || "user";

  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: `https://avatar.iran.liara.run/public/${gender}?username=${username}`,
        gender,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteUser(id: string) {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

  if (error) throw new Error(error.message);
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

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

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

  return updatedUser;
}