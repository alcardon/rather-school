import "server-only";

import { createServerClient } from "@/lib/supabase-server";
import RealtimeCourses from "./realtime-courses";

// do not cache this page
export const revalidate = 0;

export default async function Realtime() {
  const supabase = createServerClient();
  const { data } = await supabase.from("courses").select("*");

  // data can be passed from server components to client components
  // this allows us to fetch the initial Students before rendering the page
  // our <RealtimeStudents /> component will then subscribe to new Students client-side
  return <RealtimeCourses serverCourses={data || []} />;
}
