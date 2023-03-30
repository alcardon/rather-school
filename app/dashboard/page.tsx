"use client";

import { useSupabase } from "@/components/auth/supabaseProvider";
import CardTable from "@/components/dashboard/common/cardTable";

export default function Page() {
  const { supabase } = useSupabase();
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  /*   <button className="block button" onClick={handleLogout}>
    Sign Out
  </button>; */
  return (
    <>
      <div className="mt-4 flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <CardTable />
        </div>
        <div className="mb-12 w-full px-4">
          <CardTable color="dark" />
        </div>
      </div>
    </>
  );
}
