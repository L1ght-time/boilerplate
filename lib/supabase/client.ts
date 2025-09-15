import { createBrowserClient } from "@supabase/ssr";
import { ENVIRONMENTS } from "~/lib/constants";

export const createClient = () =>
  createBrowserClient(
    ENVIRONMENTS.NEXT_PUBLIC_SUPABASE_URL,
    ENVIRONMENTS.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  );
