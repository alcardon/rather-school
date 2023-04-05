"use client"

import React, { useState, useEffect, useMemo, useRef } from "react";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import SearchBar from "@/components/dashboard/common/SearchBar";
import StatusPillCourses from "../courses/statusPillCourses";
import { Courses } from "@/lib/types";
import Image from "next/image";
import { PageButton } from "@/components/dashboard/common/Button";
import { SortUpIcon, SortDownIcon } from "@/components/dashboard/common/Icons";
import IndeterminateCheckbox from "@/components/dashboard/addStudent/indeterminateCheckbox";

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


import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import { useRowSelect } from "react-table";



interface CardTableProps {
  color: "light" | "dark";
  data: Courses[];
  selectedCourses: any;
  setSelectedCourses: any;
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

export default function SelectCoursesTable({ data, color, setSelectedCourses }: CardTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = useState("");



  const columns = useMemo<ColumnDef<Courses, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            { ...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            } }
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              { ...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              } }
            />
          </div>
        ),
      },
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
        accessorKey: "course_title",
        header: () => "Course",
        cell: ({ row }) => (<div className="flex items-center text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
          <Image
            src={ `${row.getValue(
              "course_avatar_url"
            )}` }
            alt={ `Avatar Img of ${row.getValue('course_title')}` }
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
            { row.getValue("course_title") }
          </span>
        </div >),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "code",
        id: "code",
        header: () => <span>Code</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "course_duration",
        id: "course_duration",
        header: () => <span>Duration</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "course_language",
        id: "course_language",
        header: () => "Languague",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "course_level",
        id: "course_level",
        header: () => "Course level",
        footer: (props) => props.column.id,
      },

      {
        accessorKey: "course_status",
        id: "course_status",
        header: "Status",
        footer: (props) => props.column.id,
        cell: (row) => (
          <div
            className="text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
          >
            { " " }
            <StatusPillCourses value={ row.getValue() } />
          </div>)
      },
    ],
    []
  );


  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      /*   rowSelection, */
    },
    initialState: {
      columnVisibility: { course_avatar_url: false, course_id: false },
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    /*  enableRowSelection: true, //enable row selection for all rows */
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    /*  onRowSelectionChange: setRowSelection, */
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
    if (table.getState().columnFilters[0]?.id === "course_title") {
      if (table.getState().sorting[0]?.id !== "course_title") {
        table.setSorting([{ id: "course_title", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  useEffect(() => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const courseIds = selectedRows.map(course => course.original.course_id);
    setSelectedCourses(courseIds)
  }, [table.getFilteredSelectedRowModel().rows]);

  return (
    <>
      <div
        className={
          "relative mb-6  flex w-full min-w-0 flex-col break-words rounded  bg-white shadow-lg px-3" +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="px-4 py-3 mb-0 border-0 rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
              <h5
                className={
                  "text-md font-semibold" +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Select your prefered courses:
              </h5>
            </div>
            <SearchBar
              value={ globalFilter ?? "" }
              onChange={ (value) => setGlobalFilter(String(value)) }
              className="p-2 border shadow font-lg border-block"
              placeholder="Search all columns..."
            />
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
              { table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={ row.id }
                    className={ "hover:bg-sky-100" }
                  >
                    { row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          className="p-6 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                          key={ cell.id }
                        >
                          { flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          ) }
                        </td>
                      );
                    }) }
                  </tr>
                );
              }) }
            </tbody>

          </table>

          {/*   pagination */ }

          <div className="flex items-center px-8 py-3 border-0 justify-betweenrounded-t">
            <div className="flex justify-between flex-1 sm:hidden">
              <PageButton
                className=""
                onClick={ () => table.previousPage() }
                disabled={ !table.getCanPreviousPage() }
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>

              <PageButton
                className=""
                onClick={ () => table.nextPage() }
                disabled={ !table.getCanNextPage() }
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              { " " }
              <div className="flex items-baseline space-x-2 text-xs gap-x-2">
                <span className="text-sm text-gray-700">
                  Page{ " " }
                  <span className="font-medium">
                    { table.getState().pagination.pageIndex + 1 }
                  </span>{ " " }
                  of <span className="font-medium">{ table.getPageCount() }</span>
                </span>
                <label>
                  <span className="sr-only">Items Per Page</span>
                  <select
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={ table.getState().pagination.pageSize }
                    onChange={ (e) => {
                      table.setPageSize(Number(e.target.value));
                    } }
                  >
                    { [5, 10, 15].map((pageSize) => (
                      <option key={ pageSize } value={ pageSize }>
                        { pageSize }
                      </option>
                    )) }
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
                    onClick={ () => table.setPageIndex(0) }
                    disabled={ !table.getCanPreviousPage() }
                  >
                    <span className="sr-only">First</span>
                    <ChevronDoubleLeftIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                  <PageButton
                    className=""
                    onClick={ () => table.previousPage() }
                    disabled={ !table.getCanPreviousPage() }
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                  <PageButton
                    className=""
                    onClick={ () => table.nextPage() }
                    disabled={ !table.getCanNextPage() }
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                  <PageButton
                    className="rounded-r-md"
                    onClick={ () => table.setPageIndex(table.getPageCount() - 1) }
                    disabled={ !table.getCanNextPage() }
                  >
                    <span className="sr-only">Last</span>
                    <ChevronDoubleRightIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                </nav>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  );
}


