import CardAddCourse from "@/components/dashboard/addCourse/cardAddCourse";
import CardAddStudent from "@/components/dashboard/addStudent/cardAddStudent";

import { createServerClient } from "@/lib/supabase-server";


// do not cache this page
export const revalidate = 0;

export default async function Page() {
  const supabase = createServerClient();
  const { data } = await supabase.from("students").select("*");

  return <CardAddCourse serverStudents={ data || [] }></CardAddCourse>;
}
