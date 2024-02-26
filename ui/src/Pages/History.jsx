import React, { useEffect, useState } from "react";
import { DashboardAPI } from "../API/DashboardApiLayer";
import { useDispatch, useSelector } from "react-redux";
import { setuserhistory } from "../State/AuthSlice";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

function History() {
  const dispatch = useDispatch();
  useEffect(() => {
    DashboardAPI.GetUserHistory()
      .then((res) => {
        dispatch(setuserhistory({ userhistory: res.data.data }));
      })
      .catch((err) => {});
  }, []);

  const { userhistory } = useSelector((state) => state.auth);

  const [data] = useState(userhistory);
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
    columnHelper.accessor("checkin_time", {
      header: "checkin time",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("checkout_time", {
      header: "checkout time",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("present", {
      header: "present",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("total_hours", {
      header: "total hours",
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor("workplace", {
      header: "workplace",
      cell: (info) => {
        return info.getValue();
      },
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

export default History;
