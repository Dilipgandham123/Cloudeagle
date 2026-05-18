"use client"

import { useState } from "react"
import { ChevronsUpDown, ChevronUp, ChevronDown, Filter } from "lucide-react"
import { useEmployeeTable } from "@/context/EmployeeProvider"
import { cn } from "@/lib/utils"
import type { Employee } from "@/types/employee"

interface Props {
  column: keyof Employee
  label: string
  width?: string
  sortable?: boolean
  filterable?: boolean
  numeric?: boolean
}

export function EmployeeTableHeader({ column, label, width, sortable = true, filterable = true, numeric = false }: Props) {
  const { state, dispatch } = useEmployeeTable()
  const [showFilter, setShowFilter] = useState(false)

  const sortRule = state.sort.find(s => s.key === column)
  const sortIndex = state.sort.findIndex(s => s.key === column)
  const isActive = !!sortRule
  const filterVal = state.filters.column[column] || ""

  return (
    <th
      style={{ width }}
      className={cn(
        "relative px-4 py-2.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap bg-slate-50/50 border-b border-slate-200",
        numeric && "text-right"
      )}
    >
      <div className={cn("flex items-center gap-2", numeric && "justify-end")}>
        {sortable ? (
          <button
            onClick={() => dispatch({ type: "SET_SORT", column })}
            className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors group"
          >
            {label}
            <span className="flex items-center">
              {!isActive && <ChevronsUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
              {isActive && (
                <div className="flex items-center gap-0.5">
                  {sortRule.direction === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  {state.sort.length > 1 && (
                    <span className="text-[9px] bg-indigo-100 text-indigo-700 w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {sortIndex + 1}
                    </span>
                  )}
                </div>
              )}
            </span>
          </button>
        ) : (
          <span>{label}</span>
        )}

        {filterable && (
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={cn(
              "p-1 rounded-md transition-all",
              filterVal ? "text-indigo-600 bg-indigo-50" : "text-slate-300 hover:text-slate-600 hover:bg-slate-200/50"
            )}
          >
            <Filter className="w-3 h-3" />
          </button>
        )}
      </div>

      {showFilter && (
        <div className="absolute top-full left-0 w-full p-2 bg-white shadow-2xl border border-slate-100 rounded-b-lg z-20 animate-in fade-in slide-in-from-top-1 duration-200">
          <input
            autoFocus
            type="text"
            placeholder={`Filter ${label}...`}
            value={filterVal}
            onChange={(e) => dispatch({ type: "SET_COLUMN_FILTER", column, value: e.target.value })}
            onBlur={() => !filterVal && setShowFilter(false)}
            className="w-full bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      )}
    </th>
  )
}
