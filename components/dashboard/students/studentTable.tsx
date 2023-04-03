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
  SortIcon,
  SortUpIcon,
  SortDownIcon,
} from "@/components/dashboard/common/shared/Icons";

import type { Database } from "@/lib/database.types";

import Image from "next/image";

import {
  Button,
  PageButton,
} from "@/components/dashboard/common/shared/Button";
SearchBar;
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import SearchBar from "@/components/dashboard/common/SearchBar";
import StatusPill from "@/components/dashboard/students/statusPill";

type Student = Database["public"]["Tables"]["students"]["Row"];
interface CardTableProps {
  color: "light" | "dark";
  data: Student[];
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

export default function StudentTable({ data, color }: CardTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const router = useRouter();

  const columns = useMemo<ColumnDef<Student, any>[]>(
    () => [
      {
        accessorKey: "student_id",
        id: "student_id",
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
        accessorKey: "gender",
        header: () => <span>Gender</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "current_residence_country",
        header: () => <span>Country</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "instructor_id",
        header: () => "Instructor",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "email_address",
        header: () => "Email",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "preferred_lang",
        header: () => "Language",
        footer: (props) => props.column.id,
      },

      {
        accessorKey: "status",
        header: "Status",
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
      columnVisibility: { student_avatar_url: false, student_id: false },
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
            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
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
              className="p-2 border shadow font-lg border-block"
              placeholder="Search all columns..."
            />
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
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
                                    <SortUpIcon className="w-4 h-4 text-gray-400" />
                                  ),
                                  desc: (
                                    <SortDownIcon className="w-4 h-4 text-gray-400" />
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
                        `/dashboard/students/${row.getValue("student_id")}`
                      )
                    }
                    className={"cursor-pointer hover:bg-sky-100"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <>
                          {cell.column.id === "fullName" ? (
                            <th className="flex items-center p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                              <Image
                                src={`${cell.row.getValue(
                                  "student_avatar_url"
                                )}/?size=100x100`}
                                alt={"avatar Img"}
                                height={60}
                                width={60}
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
                                {cell.row.getValue("fullName")}
                              </span>
                            </th>
                          ) : cell.column.id === "status" ? (
                            <td
                              className="p-6 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
                              key={cell.id}
                            >
                              {" "}
                              <StatusPill value={cell.row.getValue("status")} />
                            </td>
                          ) : (
                            <td
                              className="p-6 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
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

          <div className="flex items-center px-8 py-3 border-0 justify-betweenrounded-t">
            <div className="flex justify-between flex-1 sm:hidden">
              <PageButton
                className=""
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  className="w-5 h-5 text-gray-400"
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
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </PageButton>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              {" "}
              <div className="flex items-baseline space-x-2 text-xs gap-x-2">
                <span className="text-sm text-gray-700">
                  Page{" "}
                  <span className="font-medium">
                    {table.getState().pagination.pageIndex + 1}
                  </span>{" "}
                  of <span className="font-medium">{table.getPageCount()}</span>
                </span>
                <label>
                  <span className="sr-only">Items Per Page</span>
                  <select
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                      className="w-5 h-5 text-gray-400"
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
                      className="w-5 h-5 text-gray-400"
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
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                  <PageButton
                    className="rounded-r-md"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
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

          {/*   <div>{table.getPrePaginationRowModel().rows.length} Rows</div> */}
        </div>
      </div>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex space-x-2">
        <SearchBar
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border rounded shadow"
        />
        <SearchBar
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border rounded shadow"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <SearchBar
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="border rounded shadow w-36"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}
