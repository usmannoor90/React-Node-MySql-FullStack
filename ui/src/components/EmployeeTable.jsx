import React, { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";

import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import axios from "axios";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function EmployeeTable({ Data }) {
  const [data] = useState(Data);
  const [globalFilter, setGlobalFilter] = useState("");
  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("username", {
      header: "user name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: "title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("dateofjoining", {
      header: "Date Of Joining",
      cell: (info) => {
        return info.getValue()?.split("T")[0];
      },
    }),
    columnHelper.accessor("city", {
      header: "city",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("country", {
      header: "country",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("address", {
      header: "address",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("contact", {
      header: "contact",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    autoResetAll: false,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 2,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons.push(
      <button
        className={`   px-[14px] py-[5px] mr-1 rounded-[6px]  ${
          i === table.getState().pagination.pageIndex
            ? "bg-[linear-gradient(180deg,rgba(63,_20,_194,_1),rgba(141,_73,_182,_1))] text-white "
            : "border-[1px] border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.2)]"
        }`}
        key={i}
        onClick={() => table.setPageIndex(i)}
      >
        {i + 1}
      </button>
    );
  }
  return (
    <div>
      <div className="md:overflow-hidden overflow-auto">
        <table className="  md:w-full w-[700px] ">
          <thead>
            {table.getHeaderGroups().map((eachObject) => (
              <tr
                key={eachObject.id}
                className="bg-[linear-gradient(90deg,rgba(63,_20,_194,_0.2),rgba(141,_73,_182,_0.2))] [&>th]:px-3 [&>th]:py-4 [&>th]:text-white [&>th]:font-light [&>th]:text-center                   "
              >
                {eachObject.headers.map((header) => (
                  <th
                    key={header.id}
                    className="first:rounded-l-[8px] last:rounded-r-[8px] first:w-[180px] text-center"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className=" [&>td]:text-[#9f9f9f]  [&>td]:p-3 border-b-[1px] border-b-[rgba(60,60,60,0.4)] [&>td]:font-light "
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className=" mt-3  flex items-center justify-end pb-4  ">
          <div className="   ">
            <button
              className="disabled:opacity-10 disabled:text-white bg-[rgba(255,255,255,0.2)]  text-[rgba(255,255,255,0.2)] px-[14px] py-[5px] mr-1 rounded-[6px]"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            {paginationButtons.map((u) => u)}
            <button
              className="disabled:opacity-10 disabled:text-white  bg-[rgba(255,255,255,0.2)]  text-[rgba(255,255,255,0.2)] px-[14px] py-[5px] mr-1 rounded-[6px]"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;
