"use client";

import { createContext, useContext, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

const AuthContext = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createClient());

  return (
    <AuthContext.Provider value={{ supabase }}>
      <>{children}</>
    </AuthContext.Provider>
  );
}

export const useSupabase = () => {
  let context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  } else {
    return context;
  }
};
