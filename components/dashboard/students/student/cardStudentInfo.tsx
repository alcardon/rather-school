import { parse, format } from "date-fns";
import { Students } from "@/lib/types";


export default function CardUserInfo({
  studentData,
}: {
  studentData: Students[];
}) {
  let birthday: string = format(
    //@ts-ignore
    parse(studentData[0]?.date_of_birth, "yyyy-mm-dd", new Date()),
    "MMM dd, yyyy"
  );

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
            <div className="px-4 py-2">{ studentData[0]?.first_name }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Last Name</div>
            <div className="px-4 py-2">{ studentData[0]?.last_name }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Gender</div>
            <div className="px-4 py-2">{ studentData[0]?.gender }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Contact No.</div>
            <div className="px-4 py-2">{ studentData[0]?.phone_number }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Address</div>
            <div className="px-4 py-2">{ studentData[0]?.home_address }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Country</div>
            <div className="px-4 py-2">
              { studentData[0]?.current_residence_country }
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Preferred Language</div>
            <div className="px-4 py-2">{ studentData[0]?.preferred_lang }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Learning goals</div>
            <div className="px-4 py-2">{ studentData[0]?.learning_goals }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">
              Preferred comunications channel
            </div>
            <div className="px-4 py-2">
              { studentData[0]?.prefered_coms_chanel }
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Email</div>
            <div className="px-4 py-2">
              <a
                className="text-blue-800"
                href={ `mailto:${studentData[0]?.email_address}` }
              >
                { studentData[0]?.email_address }
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Birthday</div>
            <div className="px-4 py-2">{ birthday || "" }</div>
          </div>
        </div>
      </div>
    </div>
  );
}
