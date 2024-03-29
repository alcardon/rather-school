"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationDropdown from "@/components/dashboard/layout/notificationDropdown";
import UserDropdown from "@/components/dashboard/layout/userDropdown";


export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const pathname = usePathname();
  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-xl md:fixed md:left-0 md:top-0 md:bottom-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
        <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
          {/* Toggler */ }
          <button
            className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
            type="button"
            onClick={ () => setCollapseShow("bg-white m-2 py-3 px-6") }
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */ }
          <Link href="/" className="inline-block mr-0 md:block md:pb-2">
            <Image
              src="https://mqafhqdnhbhrbnoepmti.supabase.co/storage/v1/object/public/bcimg/rslogo.png"
              width={ 180 }
              height={ 30 }
              alt="Rather School logotype"
            />
          </Link>
          {/* User */ }
          <ul className="flex flex-wrap items-center list-none md:hidden">
            <li className="relative inline-block">
              <NotificationDropdown />
            </li>
            <li className="relative inline-block">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */ }
          <div
            className={
              "absolute top-0 left-0 right-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none " +
              collapseShow
            }
          >
            {/* Collapse header */ }
            <div className="block pb-4 mb-4 border-b border-solid border-blueGray-200 md:hidden md:min-w-full">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/"
                    className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase whitespace-nowrap text-blueGray-600 md:block md:pb-2"
                  >
                    <Image></Image>
                  </Link>
                </div>
                <div className="flex justify-end w-6/12">
                  <button
                    type="button"
                    className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
                    onClick={ () => setCollapseShow("hidden") }
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */ }

            <ul className="flex flex-col list-none md:min-w-full md:flex-col">
              <li className="items-center">
                <Link
                  href="/dashboard"
                  className={
                    "block py-3 text-xs font-bold uppercase " +
                    (pathname == "/dashboard"
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (pathname == "/dashboard"
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{ " " }
                  Dashboard
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/dashboard/students"
                  className={
                    "block py-3 text-xs font-bold uppercase " +
                    (pathname == "/dashboard/students"
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-user-graduate mr-2 text-sm " +
                      (pathname == "/dashboard/students"
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{ " " }
                  Students
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/dashboard/courses"
                  className={
                    "block py-3 text-xs font-bold uppercase " +
                    (pathname == "/dashboard/courses"
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-university mr-2 text-sm " +
                      (pathname == "/dashboard/courses"
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{ " " }
                  Courses
                </Link>
              </li>
            </ul>

            {/* Divider */ }
            <hr className="my-4 md:min-w-full" />
            {/* Heading */ }
            <h6 className="block pt-1 pb-4 text-xs font-bold no-underline uppercase text-blueGray-500 md:min-w-full">
              Admin Access
            </h6>
            {/* Navigation */ }

            <ul className="flex flex-col list-none md:min-w-full md:flex-col">
              <li className="items-center">
                <Link
                  href="/dashboard/add-student"
                  className={
                    "block py-3 text-xs font-bold uppercase " +
                    (pathname == "/dashboard/add-student"
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-user-plus mr-2 text-sm " +
                      (pathname == "/dashboard/add-student"
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{ " " }
                  Add Student
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/dashboard/add-course"
                  className={
                    "block py-3 text-xs font-bold uppercase " +
                    (pathname == "/admin/course"
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-folder-plus mr-2 text-sm " +
                      (pathname == "/dashboard/add-course"
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{ " " }
                  Add course
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
