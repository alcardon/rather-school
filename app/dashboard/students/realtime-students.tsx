"use client";

import { useSupabase } from "@/components/common/supabase-provider";
import { useEffect, useState } from "react";
import StudentTable from "@/components/dashboard/students/studentTable";
import { Students } from "@/lib/types";

// realtime subscriptions need to be set up client-side
// this component takes initial students as props and automatically
// updates when new students are inserted into Supabase's `students` table
export default function RealtimeStudents({
  serverStudents,
}: {
  serverStudents: Students[];
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
      .channel("students")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "students" },
        (payload) => setStudents([...students, payload.new as Students])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setStudents, students]);


  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4 mb-12">
          <StudentTable color="light" key={ students } data={ students } />
        </div>
      </div>
    </>
  );
}
