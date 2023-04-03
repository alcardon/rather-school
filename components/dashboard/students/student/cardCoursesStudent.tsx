"use client";

import { Database } from "@/lib/database.types";
import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";

import {
  Button,
  PageButton,
} from "@/components/dashboard/common/shared/Button";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";

import {
  SortIcon,
  SortUpIcon,
  SortDownIcon,
} from "@/components/dashboard/common/shared/Icons";

import Image from "next/image";
import SearchBar from "../../common/SearchBar";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

type StudentCourseType =
  Database["public"]["Views"]["student_enrollment_grade_info"]["Row"];

interface CardStudentCoursesProps {
  color: "light" | "dark";
  studentCoursesData: StudentCourseType[];
}
export default function CardCoursesStudent({
  color,
  studentCoursesData,
}: CardStudentCoursesProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const router = useRouter();

  console.log(studentCoursesData);

  const columns = useMemo<ColumnDef<StudentCourseType, any>[]>(
    () => [
      {
        accessorKey: "course_id",
        id: "course_id",
        header: () => "",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "course_avatar_url",
        id: "course_avatar_url",
        header: () => "",
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => "course_title",
        id: "course_title",
        header: "Course",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "progress",
        header: () => "Progress",
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const table = useReactTable({
    studentCoursesData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    initialState: {
      columnVisibility: { scourse_id: false },
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);
  return (
    <>
      <div className="relative flex w-full min-w-0 flex-col break-words rounded bg-white pb-3 shadow-sm">
        <div className="mb-0 rounded-t border-0 px-4 py-3">
          <div className="mb-0 rounded-t border-0 px-4 py-3">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                <h3
                  className={
                    "text-lg font-semibold" +
                    (color === "light" ? "text-blueGray-700" : "text-white")
                  }
                >
                  Students
                </h3>
              </div>
              <SearchBar
                value={globalFilter ?? ""}
                onChange={(value) => setGlobalFilter(String(value))}
                className="font-lg border-block border p-2 shadow"
                placeholder="Search all columns..."
              />
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="w-full border-collapse items-center bg-transparent">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <>
                          <th
                            scope="col"
                            className={
                              "whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase " +
                              (color === "light"
                                ? "border-blueGray-100 bg-blueGray-50 text-blueGray-500"
                                : "border-blueGray-500 bg-blueGray-600 text-blueGray-200")
                            }
                            key={header.id}
                          >
                            {header.isPlaceholder ? null : (
                              <>
                                <div
                                  {...{
                                    className: header.column.getCanSort()
                                      ? "cursor-pointer select-none"
                                      : "",
                                    onClick:
                                      header.column.getToggleSortingHandler(),
                                  }}
                                  className="flex items-center justify-between"
                                >
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                  {{
                                    asc: (
                                      <SortUpIcon className="h-4 w-4 text-gray-400" />
                                    ),
                                    desc: (
                                      <SortDownIcon className="h-4 w-4 text-gray-400" />
                                    ),
                                  }[header.column.getIsSorted() as string] ??
                                    null}
                                </div>
                                {/*  {header.column.getCanFilter() ? (
                                <div>
                                  <Filter
                                    column={header.column}
                                    table={table}
                                  />
                                </div>
                              ) : null} */}
                              </>
                            )}
                          </th>
                        </>
                      );
                    })}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      onClick={() =>
                        router.push(
                          `/dashboard/courses/${row.getValue("course_id")}`
                        )
                      }
                      className={"cursor-pointer hover:bg-sky-100"}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <>
                            {cell.column.id === "course_title" ? (
                              <th className="flex items-center whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs">
                                <Image
                                  src={`${cell.row.getValue(
                                    "course_avatar_url"
                                  )}`}
                                  alt={"avatar Img"}
                                  height={60}
                                  width={60}
                                  className="h-12 w-12 rounded-full border bg-white"
                                ></Image>
                                <span
                                  className={
                                    "ml-3 font-bold " +
                                    +(color === "light"
                                      ? "text-blueGray-600"
                                      : "text-white")
                                  }
                                >
                                  {cell.row.getValue("course_title")}
                                </span>
                              </th>
                            ) : cell.column.id === "progress" ? (
                              <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                                <div className="flex items-center">
                                  <span className="mr-2">
                                    {cell.row.getValue("progress")}
                                  </span>
                                  <div className="relative w-full">
                                    <div className="flex h-2 overflow-hidden rounded bg-red-200 text-xs">
                                      <div
                                        style={{ width: "60%" }}
                                        className="flex flex-col justify-center whitespace-nowrap bg-red-500 text-center text-white shadow-none"
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            ) : (
                              <td
                                className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-6 px-6 align-middle text-xs"
                                key={cell.id}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            )}
                          </>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/*   pagination */}
            <div className="justify-betweenrounded-t flex items-center border-0 px-8 py-3">
              <div className="flex flex-1 justify-between sm:hidden">
                <PageButton
                  className=""
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </PageButton>

                <PageButton
                  className=""
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </PageButton>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                {" "}
                <div className="flex items-baseline gap-x-2 space-x-2 text-xs">
                  <span className="text-sm text-gray-700">
                    Page{" "}
                    <span className="font-medium">
                      {table.getState().pagination.pageIndex + 1}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{table.getPageCount()}</span>
                  </span>
                  <label>
                    <span className="sr-only">Items Per Page</span>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={table.getState().pagination.pageSize}
                      onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                      }}
                    >
                      {[10, 20, 30].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          {pageSize}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <PageButton
                      className="rounded-l-md"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <span className="sr-only">First</span>
                      <ChevronDoubleLeftIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </PageButton>
                    <PageButton
                      className=""
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </PageButton>
                    <PageButton
                      className=""
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </PageButton>
                    <PageButton
                      className="rounded-r-md"
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      disabled={!table.getCanNextPage()}
                    >
                      <span className="sr-only">Last</span>
                      <ChevronDoubleRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </PageButton>
                  </nav>
                </div>
              </div>
            </div>

            {/*   <div>{table.getPrePaginationRowModel().rows.length} Rows</div> */}
          </div>
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-1 flex-grow px-4">
              <div className="flex items-center space-x-4 font-semibold leading-8 text-gray-900">
                <i className={"fas fa-university text-emerald-600"}></i>
                <h3 className="text-base font-semibold text-blueGray-700">
                  Courses
                </h3>
              </div>
            </div>
            <div className="relative w-full max-w-full flex-1 flex-grow px-4 text-right">
              <button
                className="mb-1 mr-1 rounded bg-green-500 px-3 py-1 text-xs font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-indigo-600"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="w-full border-collapse items-center bg-transparent">
            <thead className="thead-light">
              <tr>
                <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-blueGray-100 bg-blueGray-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-blueGray-500">
                  Referral
                </th>
                <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-blueGray-100 bg-blueGray-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-blueGray-500">
                  Visitors
                </th>
                <th className="min-w-140-px whitespace-nowrap border border-l-0 border-r-0 border-solid border-blueGray-100 bg-blueGray-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-blueGray-500"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs">
                  Facebook
                </th>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  1,480
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <div className="flex items-center">
                    <span className="mr-2">60%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-red-200 text-xs">
                        <div
                          style={{ width: "60%" }}
                          className="flex flex-col justify-center whitespace-nowrap bg-red-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs">
                  Facebook
                </th>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  5,480
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <div className="flex items-center">
                    <span className="mr-2">70%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-emerald-200 text-xs">
                        <div
                          style={{ width: "70%" }}
                          className="flex flex-col justify-center whitespace-nowrap bg-emerald-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs">
                  Google
                </th>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  4,807
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <div className="flex items-center">
                    <span className="mr-2">80%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-purple-200 text-xs">
                        <div
                          style={{ width: "80%" }}
                          className="flex flex-col justify-center whitespace-nowrap bg-purple-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs">
                  Instagram
                </th>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  3,678
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <div className="flex items-center">
                    <span className="mr-2">75%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-lightBlue-200 text-xs">
                        <div
                          style={{ width: "75%" }}
                          className="flex flex-col justify-center whitespace-nowrap bg-lightBlue-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-left align-middle text-xs">
                  twitter
                </th>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  2,645
                </td>
                <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle text-xs">
                  <div className="flex items-center">
                    <span className="mr-2">30%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-orange-200 text-xs">
                        <div
                          style={{ width: "30%" }}
                          className="flex flex-col justify-center whitespace-nowrap bg-emerald-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
