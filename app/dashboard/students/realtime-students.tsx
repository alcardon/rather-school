"use client";

import { useSupabase } from "@/components/auth/supabase-provider";
import { useEffect, useState } from "react";

import type { Database } from "@/lib/database.types";
import StudentTable from "@/components/dashboard/students/studentTable";

type Student = Database["public"]["Tables"]["students"]["Row"];

// realtime subscriptions need to be set up client-side
// this component takes initial students as props and automatically
// updates when new students are inserted into Supabase's `students` table
export default function RealtimeStudents({
  serverStudents,
}: {
  serverStudents: Student[];
}) {
  const [students, setStudents] = useState(serverStudents);
  const { supabase } = useSupabase();

  useEffect(() => {
    // this overwrites `students` any time the `serverStudents` prop changes
    // this happens when the parent Server Component is re-rendered
    setStudents(serverStudents);
  }, [serverStudents]);

  useEffect(() => {
    // ensure you have enabled replication on the `students` table

    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "students" },
        (payload) => setStudents([...students, payload.new as Student])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setStudents, students]);

  return (
    <>
      <div className="mt-4 flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <StudentTable color="light" data={students} />
        </div>
      </div>
    </>
  );
}
