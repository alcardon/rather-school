"use client"

import { enrollment_student_info } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils"
import Image from "next/image";
import StatusPillCourses from "../statusPillCourses";

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
;

import {
  SortIcon,
  SortUpIcon,
  SortDownIcon,
} from "@/components/dashboard/common/Icons";



interface CardTableProps {
  color: "light" | "dark";
  data: enrollment_student_info[];
}

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

export default function CardStudentsByCourse({ data, color }: CardTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const router = useRouter();

  const columns = useMemo<ColumnDef<enrollment_student_info, any>[]>(
    () => [
      {
        accessorKey: "student_id",
        id: "student_id",
        header: () => "",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "course_id",
        id: "course_id",
        header: () => "",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "student_avatar_url",
        id: "student_avatar_url",
        header: () => "",
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => ` ${row.first_name} ${row.last_name}`,
        id: "fullName",
        header: "Full Name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },

      {
        accessorKey: "payment_status",
        header: () => "Payment status",
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

  /*   const [data, setData] = useState<Person[]>(() => makeData(50000));
  const refreshData = () => setData((old) => makeData(50000)); */

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    initialState: {
      columnVisibility: { course_id: false, student_id: false, student_avatar_url: false },
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
      <div
        className={
          "relative mb-6  flex w-full min-w-0 flex-col break-words rounded  bg-white shadow-lg" +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="px-4 py-3 mb-0 border-0 rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 flex-grow w-full max-w-full">
              <div className="flex items-center pl-4 space-x-4 font-semibold leading-8 text-gray-900">
                <i className={ "fas fa-university text-emerald-600" }></i>
                <span>Students</span>
              </div>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="bg-gray-50">
              { table.getHeaderGroups().map((headerGroup) => (
                <tr key={ headerGroup.id }>
                  { headerGroup.headers.map((header) => {
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
                          key={ header.id }
                        >
                          { header.isPlaceholder ? null : (
                            <>
                              <div
                                { ...{
                                  className: header.column.getCanSort()
                                    ? "cursor-pointer select-none"
                                    : "",
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                } }
                                className="flex items-center justify-between"
                              >
                                { flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                ) }
                                { {
                                  asc: (
                                    <SortUpIcon className="w-4 h-4 text-gray-400" />
                                  ),
                                  desc: (
                                    <SortDownIcon className="w-4 h-4 text-gray-400" />
                                  ),
                                }[header.column.getIsSorted() as string] ??
                                  null }
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
                          ) }
                        </th>
                      </>
                    );
                  }) }
                </tr>
              )) }
            </thead>

            <tbody>
              { table ? table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={ row.id }
                    onClick={ () =>
                      router.push(
                        `/dashboard/students/${row.getValue("student_id")}`
                      )
                    }
                    className={ "cursor-pointer hover:bg-sky-100" }
                  >
                    { row.getVisibleCells().map((cell) => {
                      return (
                        <>
                          { cell.column.id === "fullName" ? (
                            <th className="flex items-center p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                              <Image
                                src={ `${cell.row.getValue(
                                  "student_avatar_url"
                                )}/?size=100x100` }
                                alt={ "avatar Img" }
                                height={ 60 }
                                width={ 60 }
                                className="w-12 h-12 bg-white border rounded-full"
                              ></Image>
                              <span
                                className={
                                  "ml-3 font-bold " +
                                  +(color === "light"
                                    ? "text-blueGray-600"
                                    : "text-white")
                                }
                              >
                                { cell.row.getValue("fullName") }
                              </span>
                            </th>
                          ) : cell.column.id === "progress" ? (
                            <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="mr-2">
                                  { cell.row.getValue("progress") }
                                </span>
                                <div className="relative w-full">
                                  <div className="flex h-2 overflow-hidden text-xs bg-green-200 rounded">
                                    <div
                                      style={ { width: `${cell.row.getValue("progress")}%` } }
                                      className="flex flex-col justify-center text-center text-white bg-green-500 shadow-none whitespace-nowrap"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          ) : cell.column.id === "payment_status" ? <td
                            className="p-6 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                            key={ cell.id }
                          > <StatusPillCourses value={ cell.row.getValue("payment_status") } />  </td> : (
                            <td
                              className="p-6 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                              key={ cell.id }
                            >
                              { flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              ) }
                            </td>
                          ) }
                        </>
                      );
                    }) }
                  </tr>
                );
              }) : <div></div> }
            </tbody>
          </table>



          {/*   <div>{table.getPrePaginationRowModel().rows.length} Rows</div> */ }
        </div>
      </div>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */ }
    </>
  );
}




