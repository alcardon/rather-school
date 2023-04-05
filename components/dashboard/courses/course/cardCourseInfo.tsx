import { parse, format, parseJSON } from "date-fns";
import { Database } from "@/lib/database.types";
type courseType = Database["public"]["Tables"]["courses"]["Row"];

export default function CardUserInfo({
  courseData,
}: {
  courseData: courseType[];
}) {



  return (
    <div className="relative p-3 bg-white rounded shadow">
      <div className="flex items-center pl-4 space-x-4 font-semibold leading-8 text-gray-900">
        <i className={ "fas fa-university text-emerald-600" }></i>
        <span className="tracking-wide text-blueGray-800">Course </span>
      </div>
      <div className="pt-3 text-gray-700">
        <div className="grid text-sm md:grid-cols-1">
          <div className="grid grid-cols-1">

            <div className="px-4 py-2 font-bold">{ courseData[0]?.course_title }</div>
          </div>
          <div className="grid grid-cols-1">
            <div className="px-4 pt-2 font-semibold">Description</div>
            <div className="px-4 py-2">{ courseData[0]?.course_description }</div>
          </div>
        </div>
        <div className="grid pt-2 text-sm md:grid-cols-2">
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Code</div>
            <div className="px-4 py-2">{ courseData[0]?.code }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Subject</div>
            <div className="px-4 py-2">{ courseData[0]?.course_subject }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Duration</div>
            <div className="px-4 py-2">{ courseData[0]?.course_duration }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Language</div>
            <div className="px-4 py-2">{ courseData[0]?.course_language }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Level</div>
            <div className="px-4 py-2">{ courseData[0]?.course_level }</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Max students per class</div>
            <div className="px-4 py-2">{ courseData[0]?.max_students }</div>
          </div>


        </div>
        {/*<div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Gender</div>
            <div className="px-4 py-2">{courseData[0]?.gender}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Contact No.</div>
            <div className="px-4 py-2">{courseData[0]?.phone_number}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Address</div>
            <div className="px-4 py-2">{courseData[0]?.home_address}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Country</div>
            <div className="px-4 py-2">
              {courseData[0]?.current_residence_country}
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Preferred Language</div>
            <div className="px-4 py-2">{courseData[0]?.preferred_lang}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Learning goals</div>
            <div className="px-4 py-2">{courseData[0]?.learning_goals}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">
              Preferred comunications channel
            </div>
            <div className="px-4 py-2">
              {courseData[0]?.prefered_coms_chanel}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Email</div>
            <div className="px-4 py-2">
              <a
                className="text-blue-800"
                href={`mailto:${courseData[0]?.email_address}`}
              >
                {courseData[0]?.email_address}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-semibold">Birthday</div>
            <div className="px-4 py-2">{birthday || ""}</div>
          </div> */}
      </div>
    </div>

  );
}
