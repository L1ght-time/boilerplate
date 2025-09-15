import { supabase } from "~/lib/supabase/server";

export const getUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at");

  if (error) {
    console.error("Error fetching users:", error.message);
    throw new Error("Failed to fetch users");
  }

  return data ?? [];
};
