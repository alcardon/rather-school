"use client";

import { useSupabase } from "@/components/auth/supabase-provider";
import { useEffect, useState } from "react";

import type { Database } from "@/lib/database.types";
import StudentTable from "@/components/dashboard/courses/coursesTable";

type Student = Database["public"]["Tables"]["courses"]["Row"];

// realtime subscriptions need to be set up client-side
// this component takes initial courses as props and automatically
// updates when new courses are inserted into Supabase's `courses` table
export default function RealtimeCourses({
  serverStudents,
}: {
  serverStudents: Student[];
}) {
  const [students, setStudents] = useState(serverStudents);
  const { supabase } = useSupabase();

  useEffect(() => {
    // this overwrites `courses` any time the `serverCourses` prop changes
    // this happens when the parent Server Component is re-rendered
    setStudents(serverStudents);
  }, [serverStudents]);

  useEffect(() => {
    // ensure you have enabled replication on the `Courses` table
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
          {/* <StudentsTable data={[]} color={"light"} /> */}
          <StudentTable color="light" data={students} />
          {/*  <pre>{JSON.stringify(student, null, 2)}</pre> */}
        </div>
      </div>
    </>
  );
}
