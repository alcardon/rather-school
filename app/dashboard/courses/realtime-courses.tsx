"use client";

import { useSupabase } from "@/components/auth/supabase-provider";
import { useEffect, useState } from "react";

import type { Database } from "@/lib/database.types";
import CoursesTable from "@/components/dashboard/courses/coursesTable";

type Courses = Database["public"]["Tables"]["courses"]["Row"];

// realtime subscriptions need to be set up client-side
// this component takes initial Courses as props and automatically
// updates when new Courses are inserted into Supabase's `Courses` table
export default function RealtimeCourses({
  serverCourses,
}: {
  serverCourses: Courses[];
}) {
  const [courses, setCourses] = useState(serverCourses);
  const { supabase } = useSupabase();

  useEffect(() => {
    // this overwrites `Courses` any time the `serverCourses` prop changes
    // this happens when the parent Server Component is re-rendered
    setCourses(serverCourses);
  }, [serverCourses]);

  useEffect(() => {
    // ensure you have enabled replication on the `Courses` table

    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "courses" },
        (payload) => setCourses([...courses, payload.new as Courses])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setCourses, courses]);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4 mb-12">
          <CoursesTable color="light" data={courses} />
        </div>
      </div>
    </>
  );
}
