import CardCourseInfo from "@/components/dashboard/courses/course/cardCourseInfo";
import CardCourseImage from "@/components/dashboard/courses/course/cardCourseImage";

import { createServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import CardStudentsByCourse from "@/components/dashboard/courses/course/CardStudentsByCourse";
import CardStudentCourses from "@/components/dashboard/students/student/CardStudentCourses";


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
    .from("enrollment_info")
    .select("*")
    .eq("course_id", course);
    
   console.log ( "enrollment_info",data)
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
       <div className="w-full px-4 pt-6 mb-8 first-line lg:pt-0 xl:w-8/12 xl:mb-0">
         <CardCourseInfo courseData={course_data || []} />
        </div>
        <div className="w-full px-4 xl:w-4/12 ">
          <CardCourseImage courseData={course_data || []} />
        </div>
 
      <div className="flex flex-wrap w-full mt-4">
        <div className="w-full px-4 xl:w-12/12">
        <CardStudentsByCourse color="light" data={data || []} /> 
        </div>
       
         
   
        </div>
      </div>
    </>
  );
}
