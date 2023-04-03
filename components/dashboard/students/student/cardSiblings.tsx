"use client";

import { Database } from "@/lib/database.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
type StudentType = Database["public"]["Tables"]["students"]["Row"];

export default function CardSiblings({
  siblingsData,
}: {
  siblingsData: StudentType[];
}) {
  const router = useRouter();
  return (
    <div className="rounded bg-white p-3 shadow">
      <div className="flex items-center space-x-4 pl-4 font-semibold leading-8 text-gray-900">
        <i className={"fas fa-users text-emerald-600"}></i>
        <span>Siblings</span>
      </div>
      <div className="grid grid-cols-3">
        {siblingsData.map((sibling) => (
          <div
            className="my-2 flex cursor-pointer flex-col items-center justify-center"
            onClick={() =>
              router.push(`/dashboard/students/${sibling?.student_id}`)
            }
          >
            <Image
              // @ts-ignore
              src={sibling?.student_avatar_url}
              alt="Student profile pic"
              width={68}
              height={68}
              className="h-auto rounded-full border-2 border-gray-300 align-middle "
            />
            <a href="#" className="text-sm text-blueGray-800">
              {`${sibling?.first_name} ${sibling?.last_name}`}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
