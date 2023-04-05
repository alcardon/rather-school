import CardUserInfo from "@/components/dashboard/students/student/cardStudentInfo";
import CardProfileImage from "@/components/dashboard/students/student/cardProfileImage";
import CardSiblings from "@/components/dashboard/students/student/cardSiblings";
import { createServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import CardStudentCourses from "@/components/dashboard/students/student/CardStudentCourses";


export const revalidate = 0;

export default async function Page({
  params: { student },
}: {
  params: { student: string };
}) {
  const supabase = createServerClient();
  /* const { data } = await supabase.from("students").select("*"); */
  const { data: student_data } = await supabase
    .from("students")
    .select("*")
    .eq("student_id", student);

  const { data: student_siblings_ids } = await supabase
    .from("sibling_relationships")
    .select("sibling_id")
    .eq("student_id", student);

  if (!student_siblings_ids) {
    notFound();
  }

  const sibling_data_promises = student_siblings_ids.map(async (sibling) => {
    const { data: student_data } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", sibling.sibling_id);

    if (!student_data) {
      notFound();
    }

    return student_data;
  });

  const SiblingData = (await Promise.all(sibling_data_promises)).flat();

  const { data } = await supabase
    .from("enrollment_grade_details")
    .select("*")
    .eq("student_id", student);


  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-wrap mb-36">
        <div className="flex-col flex-wrap w-full px-3 mt-4 xl:w-4/12">
          <div className="w-full">
            { " " }

            <CardProfileImage studentData={ student_data || [] } />
          </div>
          <div className="w-full pt-6 ">
            <CardSiblings siblingsData={ SiblingData || [] } />
          </div>
        </div>
        <div className="flex-col flex-wrap w-full px-3 mt-4 break-words xl:mb-0 xl:w-8/12">
          <div className="w-full">
            { " " }
            <CardUserInfo studentData={ student_data || [] } />
          </div>

          <div className="w-full pt-6">

            <CardStudentCourses color="light" data={ data || [] } />
          </div>

        </div>
      </div>
    </>
  );
}
