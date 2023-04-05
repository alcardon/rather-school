import CardCourseInfo from "@/components/dashboard/courses/course/cardCourseInfo";
import CardCourseImage from "@/components/dashboard/courses/course/cardCourseImage";
import { createServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import CardStudentsByCourse from "@/components/dashboard/courses/course/CardStudentsByCourse";
import CardTeachers from "@/components/dashboard/courses/course/cardTeachers";



export const revalidate = 60;

export default async function Page({
  params: { course },
}: {
  params: { course: string };
}) {
  const supabase = createServerClient();

  const { data: course_data } = await supabase
    .from("courses")
    .select("*")
    .eq("course_id", course);

  const { data } = await supabase
    .from("enrollment_student_info")
    .select("*")
    .eq("course_id", course);

  console.log("enrollment_student_info", data)

  if (!data) {
    notFound();
  }

  /*  const { data } = await supabase
   .from("student_enrollment_grade_info")
   .select("*")
   .eq("student_id", course);

 /*  console.log(student_courses);

 if (!data) {
   notFound();
 } */




  return (
    <>
      <div className="flex flex-wrap mb-36">

        <div className="flex-col flex-wrap w-full px-3 mt-4 xl:w-4/12">
          <div className="w-full">
            <CardCourseImage courseData={ course_data || [] } />
          </div>
          <div className="w-full pt-6 ">
            <CardTeachers />
          </div>
        </div>

        <div className="flex-col flex-wrap w-full px-3 mt-4 break-words xl:mb-0 xl:w-8/12">
          <div className="w-full">
            <CardCourseInfo courseData={ course_data || [] } />
          </div>
          <div className="w-full pt-6">
            <CardStudentsByCourse color="light" data={ data || [] } />
          </div>
        </div>
      </div>
    </>
  );
}
