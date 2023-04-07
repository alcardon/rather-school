"use client"
import { parse, format } from "date-fns";
import { Students } from "@/lib/types";
import { useEffect, useState } from "react";


export default function CardUserInfo({
  studentData,
}: {
  studentData: Students[];
}) {
  useState
  const [data, setData] = useState(studentData)


  const formatBirthday = (date) => {
    return format(
      //@ts-ignore
      parse(date, "yyyy-mm-dd", new Date()),
      "MMM dd, yyyy"
    );
  }
  useEffect(() => {
    setData(studentData)


  }, [studentData])


  return (
    <div className="relative p-3 bg-white rounded shadow">
      <div className="flex items-center pl-4 space-x-4 font-semibold leading-8 text-gray-900">
        <i className={ "fas fa-user text-emerald-600" }></i>
        <span className="tracking-wide text-blueGray-800">About</span>
      </div>
      <div className="text-gray-700">
        <div className="grid text-sm md:grid-cols-2">
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">First Name</div>
            <div className="px-4 py-2">{ data[0]?.first_name }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Last Name</div>
            <div className="px-4 py-2">{ data[0]?.last_name }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Gender</div>
            <div className="px-4 py-2">{ data[0]?.gender }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Contact No.</div>
            <div className="px-4 py-2">{ data[0]?.phone_number }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Address</div>
            <div className="px-4 py-2">{ data[0]?.home_address }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Country</div>
            <div className="px-4 py-2">
              { data[0]?.current_residence_country }
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Preferred Language</div>
            <div className="px-4 py-2">{ data[0]?.preferred_lang }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Learning goals</div>
            <div className="px-4 py-2">{ data[0]?.learning_goals }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">
              Preferred comunications channel
            </div>
            <div className="px-4 py-2">
              { data[0]?.prefered_coms_chanel }
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Email</div>
            <div className="px-4 py-2">
              <a
                className="text-blue-800"
                href={ `mailto:${data[0]?.email_address}` }
              >
                { data[0]?.email_address }
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Birthday</div>
            <div className="px-4 py-2">{ formatBirthday(data[0].date_of_birth) || "" }</div>
          </div>
        </div>
      </div>
    </div>
  );
}
