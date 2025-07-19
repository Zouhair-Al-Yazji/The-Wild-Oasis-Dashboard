import type { User } from "@/features/authentication/users/useUser";
import supabase, { supabaseAdmin } from "@/services/supabase";

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

export async function login() {}

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

  if (!session) throw new Error("User not authenticated");

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}
