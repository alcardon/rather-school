"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSupabase } from "./supabase-provider";

export default function SupabaseListener({
  serverAccessToken,
}: {
  serverAccessToken?: string;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        router.refresh();
      }
      if (!session?.access_token) {
        router.push("/login");
      }
      if (session && !pathname.startsWith("/dashboard")) {
        router.push("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, router, supabase]);

  return null;
}
