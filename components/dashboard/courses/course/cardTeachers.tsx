"use client";


import Image from "next/image";
import { useRouter } from "next/navigation";
import { Students } from "@/lib/types";

export default function CardTeachers() {
  const router = useRouter();
  return (
    <div className="p-3 bg-white rounded shadow">
      <div className="flex items-center pl-4 space-x-4 font-semibold leading-8 text-gray-900">
        <i className={ "fas fa-chalkboard-teacher text-emerald-600" }></i>
        <span>Teachers</span>
      </div>
      <div className="grid grid-cols-3">
        {/* { siblingsData.map((sibling) => (
          <div
            className="flex flex-col items-center justify-center my-2 cursor-pointer"
            onClick={ () =>
              router.push(`/dashboard/students/${sibling?.student_id}`)
            }
          >
            <Image
              // @ts-ignore
              src={ sibling?.student_avatar_url }
              alt="Student profile pic"
              width={ 68 }
              height={ 68 }
              className="h-auto align-middle border-2 border-gray-300 rounded-full "
            />
            <a href="#" className="text-sm text-blueGray-800">
              { `${sibling?.first_name} ${sibling?.last_name}` }
            </a>
          </div>
        )) } */}
      </div>
    </div>
  );
}
