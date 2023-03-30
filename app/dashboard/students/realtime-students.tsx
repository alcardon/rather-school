"use client";

import { useSupabase } from "@/components/auth/supabase-provider";
import { useEffect, useState } from "react";

import type { Database } from "@/lib/database.types";
import CardTable from "@/components/dashboard/common/cardTable";

type Student = Database["public"]["Tables"]["students"]["Row"];

// realtime subscriptions need to be set up client-side
// this component takes initial posts as props and automatically
// updates when new posts are inserted into Supabase's `posts` table
export default function RealtimeStudents({
  serverStudents,
}: {
  serverStudents: Student[];
}) {
  const [student, setStudent] = useState(serverStudents);
  const { supabase } = useSupabase();

  useEffect(() => {
    // this overwrites `posts` any time the `serverPosts` prop changes
    // this happens when the parent Server Component is re-rendered
    setStudent(serverStudents);
  }, [serverStudents]);

  useEffect(() => {
    // ensure you have enabled replication on the `posts` table
    // https://app.supabase.com/project/_/database/replication
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "students" },
        (payload) => setStudent([...student, payload.new as Student])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setStudent, student]);

  return (
    <>
      <div className="mt-4 flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <CardTable />
          <pre>{JSON.stringify(student, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}
