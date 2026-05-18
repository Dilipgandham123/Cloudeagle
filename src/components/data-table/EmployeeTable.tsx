"use client"

import { useRef, useMemo } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useEmployeeTable } from "@/context/EmployeeProvider"
import { EmployeeTableHeader } from "./EmployeeTableHeader"
import { EmployeeRow } from "./EmployeeRow"
import { EmployeeTablePagination } from "./EmployeeTablePagination"

const COLUMNS = [
  { key: "id" as const, label: "ID", width: "60px", sortable: true, filterable: false },
  { key: "name" as const, label: "Name", width: "180px" },
  { key: "email" as const, label: "Email", width: "240px" },
  { key: "department" as const, label: "Department", width: "140px" },
  { key: "role" as const, label: "Role", width: "160px" },
  { key: "salary" as const, label: "Salary", width: "110px", numeric: true },
  { key: "age" as const, label: "Age", width: "70px", numeric: true },
  { key: "experience" as const, label: "Exp (yrs)", width: "90px", numeric: true },
  { key: "status" as const, label: "Status", width: "110px" },
  { key: "joinedAt" as const, label: "Joined", width: "120px", filterable: false },
]

export function EmployeeTable() {
  const { state, processedRows } = useEmployeeTable()
  const scrollRef = useRef<HTMLDivElement>(null)

  const paginatedRows = useMemo(() => {
    if (state.useVirtualScroll) return processedRows
    const start = state.page * state.pageSize
    return processedRows.slice(start, start + state.pageSize)
  }, [processedRows, state.useVirtualScroll, state.page, state.pageSize])

  const virtualizer = useVirtualizer({
    count: paginatedRows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 44,
    overscan: 20,
  })

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white">
      <div ref={scrollRef} className="flex-1 overflow-auto">
        <table className="w-full border-collapse table-fixed min-w-[1380px]">
          <thead className="sticky top-0 z-10">
            <tr>
              {COLUMNS.map((col) => (
                <EmployeeTableHeader
                  key={col.key}
                  column={col.key}
                  label={col.label}
                  sortable={col.sortable !== false}
                  filterable={col.filterable !== false}
                  numeric={col.numeric}
                  width={col.width}
                />
              ))}
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50 border-b border-slate-200">
                Actions
              </th>
            </tr>
          </thead>

          {state.useVirtualScroll ? (
            <tbody
              style={{
                height: virtualizer.getTotalSize(),
                position: "relative",
              }}
            >
              {virtualItems.map((vItem) => (
                <EmployeeRow
                  key={paginatedRows[vItem.index].id}
                  row={paginatedRows[vItem.index]}
                  style={{
                    position: "absolute",
                    top: vItem.start,
                    left: 0,
                    width: "100%",
                  }}
                  columns={COLUMNS}
                />
              ))}
            </tbody>
          ) : (
            <tbody>
              {paginatedRows.map((row) => (
                <EmployeeRow key={row.id} row={row} columns={COLUMNS} />
              ))}
            </tbody>
          )}
        </table>

        {processedRows.length === 0 && (
          <div className="flex items-center justify-center py-20 text-slate-400 text-sm">
            No results match your filters
          </div>
        )}
      </div>

      {!state.useVirtualScroll && <EmployeeTablePagination />}
    </div>
  )
}
