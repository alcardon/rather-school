import { Database } from "@/lib/database.types";
import Image from "next/image";
import { parseJSON, format } from "date-fns";

type StudentType = Database["public"]["Tables"]["students"]["Row"];

export default function CardProfileImage({
  studentData,
}: {
  studentData: StudentType[];
}) {
  let enrollmentDate: String = format(
    // @ts-ignore
    parseJSON(studentData[0]?.created_at),
    "MMM dd, yyyy"
  );

  return (
    <div className="relative flex flex-col space-y-2 break-words rounded border-t-4 border-green-400 bg-white p-3 shadow">
      {/*  <img
            alt="..."
            src={studentData[0]?.student_avatar_url}
            className="absolute h-auto -m-16 -ml-20 align-middle border-none rounded-full shadow-xl max-w-150-px lg:-ml-16"
          /> */}
      <div className="flex flex-row items-center justify-center">
        <Image
          // @ts-ignore
          src={studentData[0]?.student_avatar_url}
          alt="Student profile pic"
          width={150}
          height={150}
          className="h-auto rounded-full border-2 border-gray-300 align-middle "
        />
      </div>

      <h1 className="my-1 text-xl font-bold leading-8 text-blueGray-800">
        {`${studentData[0]?.first_name} ${studentData[0]?.last_name}`}
      </h1>
      <h3 className="font-lg text-semibold leading-6 text-gray-600">
        {studentData[0]?.occupation}
      </h3>
      <p className="text-sm leading-6 text-gray-500 hover:text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit,
        eligendi dolorum sequi illum qui unde aspernatur non deserunt
      </p>
      <ul className="mt-3 divide-y rounded bg-gray-100 px-3 py-2 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
        <li className="flex items-center py-3">
          <span>Status</span>
          <span className="ml-auto">
            <span className="mr-1 inline-block rounded bg-emerald-200 px-2 py-1 text-xs font-semibold uppercase text-emerald-600 last:mr-0">
              Active
            </span>
          </span>
        </li>
        <li className="flex items-center py-3">
          <span>Member since</span>
          <span className="ml-auto">{enrollmentDate}</span>
        </li>
      </ul>
      {/* <pre>{JSON.stringify(studentData, null, 2)}</pre> */}
    </div>
  );
}
