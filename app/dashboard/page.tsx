"use client";

import { useSupabase } from "@/components/auth/supabaseProvider";

export default function Page() {
  const { supabase } = useSupabase();
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <>
      {" "}
      <button className="button block" onClick={handleLogout}>
        Sign Out
      </button>
      <h1>Dashboard</h1>
    </>
  );
}
