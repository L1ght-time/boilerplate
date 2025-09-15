import { createClient } from "@supabase/supabase-js";
import { ENVIRONMENTS } from "~/lib/constants";

export const supabase = createClient(
  ENVIRONMENTS.NEXT_PUBLIC_SUPABASE_URL,
  ENVIRONMENTS.SUPABASE_SECRET_KEY
);
