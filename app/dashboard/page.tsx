import "server-only";

import { createServerClient } from "@/lib/supabase-server";
import RealtimeCourses from "./courses/realtime-courses";
import RealtimeStudents from "./students/realtime-students";


// do not cache this page
export const revalidate = 0;

export default async function Page() {
  const supabase = createServerClient();
  const { data: coursesData } = await supabase.from("courses").select("*");
  const { data: studentsData } = await supabase.from("students").select("*");

  return (
    <>
      <div className="mt-4 flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <RealtimeCourses serverCourses={ coursesData || [] } />
        </div>
        <div className="mb-12 w-full px-4">
          <RealtimeStudents serverStudents={ studentsData || [] } />
        </div>
      </div>
    </>
  );
}
