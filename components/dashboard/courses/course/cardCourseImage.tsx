import { Database } from "@/lib/database.types";
import Image from "next/image";
import { parseJSON, format } from "date-fns";
import StatusPillCourses from "../statusPillCourses";

type courseType = Database["public"]["Tables"]["courses"]["Row"];

export default function CardCourseImage({
  courseData,
}: {
  courseData: courseType[];
}) {
  let creationDate: String = format(
    // @ts-ignore
    parseJSON(courseData[0]?.created_at),
    "MMM dd, yyyy"
  );
  let updatedAt: String = format(
    // @ts-ignore
    parseJSON(courseData[0]?.updated_at),
    "MMM dd, yyyy"
  );
  return (
    <div className="relative flex flex-col items-center justify-center p-3 space-y-2 break-words bg-white border-t-4 border-purple-400 rounded shadow">
      {/*  <img
            alt="..."
            src={courseData[0]?.student_avatar_url}
            className="absolute h-auto -m-16 -ml-20 align-middle border-none rounded-full shadow-xl max-w-150-px lg:-ml-16"
          /> */}
      <div className="flex flex-row items-center justify-center">
        <Image
          // @ts-ignore
          src={ courseData[0]?.course_avatar_url }
          alt="Student profile pic"
          width={ 150 }
          height={ 150 }
          className="h-auto align-middle border-2 border-gray-300 rounded-full "
        />
      </div>

      <h1 className="my-1 text-xl font-bold leading-8 text-center text-blueGray-800">
        { courseData[0]?.course_title }
      </h1>
      <div className="grid grid-cols-2">
        <div className="px-4 py-1 font-semibold">Creation date</div>
        <div className="px-4 py-1">{ creationDate }</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="px-4 py-1 font-semibold">Updated at</div>
        <div className="px-4 py-1">{ updatedAt }</div>
      </div>
      <div className="grid grid-cols-2 ">
        <div className="px-4 py-1 font-semibold">Status</div>
        <div className="flex items-center px-4 py-1 text-xs align-middle whitespace-nowrap"> <StatusPillCourses value={ courseData[0]?.course_status } /></div>
      </div>

    </div>
  );
}
