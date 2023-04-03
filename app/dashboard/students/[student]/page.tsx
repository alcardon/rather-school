import CardUserInfo from "@/components/dashboard/students/student/cardStudentInfo";
import CardProfileImage from "@/components/dashboard/students/student/cardProfileImage";
import CardSiblings from "@/components/dashboard/students/student/cardSiblings";
import { createServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import CardCoursesStudent from "@/components/dashboard/students/student/cardCoursesStudent";

export const revalidate = 60;

export default async function Page({
  params: { student },
}: {
  params: { student: string };
}) {
  const supabase = createServerClient();

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

  const { data: student_courses } = await supabase
    .from("student_enrollment_grade_info")
    .select("*")
    .eq("student_id", student);

  /*  console.log(student_courses);
   */
  if (!student_courses) {
    notFound();
  }

  return (
    <>
      <div className="mb-36 flex flex-wrap">
        <div className="mt-4 w-full flex-col flex-wrap px-3 xl:w-4/12">
          <div className="w-full">
            {" "}
            <CardProfileImage studentData={student_data || []} />
          </div>
          <div className="w-full pt-6 ">
            <CardSiblings siblingsData={SiblingData || []} />
          </div>
        </div>
        <div className="mt-4 w-full flex-col flex-wrap break-words px-3 xl:mb-0 xl:w-8/12">
          <div className="w-full">
            {" "}
            <CardUserInfo studentData={student_data || []} />
          </div>

          <div className="w-full pt-6">
            <CardCoursesStudent
              studentCoursesData={student_courses || []}
              color={"light"}
            />
          </div>
          {/*   <pre>{JSON.stringify(student_data, null, 2)}</pre> */}
        </div>
      </div>
    </>
  );
}
