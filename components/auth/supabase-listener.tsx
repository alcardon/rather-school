"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSupabase } from "./supabase-provider";

export default function SupabaseListener({
  serverAccessToken,
}: {
  serverAccessToken?: string;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        router.refresh();
      }

      if (!session) {
        router.push("/login");
      }

      if (session) {
        router.push("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, router, supabase]);

  return null;
}
