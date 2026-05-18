"use client"

import { Search, X, Download, ToggleLeft, ToggleRight } from "lucide-react"
import { useEmployeeTable } from "@/context/EmployeeProvider"
import { exportToCsv } from "@/lib/exportCsv"

export function EmployeeControls() {
  const { state, processedRows, dispatch } = useEmployeeTable()

  const hasFilters = state.filters.global || Object.keys(state.filters.column).length > 0

  return (
    <div className="flex items-center gap-4 px-4 py-3 flex-wrap">
      <div className="relative flex-1 min-w-[240px] max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search employees..."
          value={state.filters.global}
          onChange={(e) => dispatch({ type: "SET_GLOBAL_FILTER", value: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
        />
      </div>

      {hasFilters && (
        <button
          onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-600 bg-white border border-slate-200 rounded-lg transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Clear filters
        </button>
      )}

      <div className="ml-auto flex items-center gap-3">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {processedRows.length.toLocaleString()} Results
        </span>

        <button
          onClick={() => dispatch({ type: "TOGGLE_SCROLL_MODE" })}
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition-all"
        >
          {state.useVirtualScroll ? (
            <ToggleRight className="w-4 h-4 text-indigo-600" />
          ) : (
            <ToggleLeft className="w-4 h-4 text-slate-400" />
          )}
          <span className="text-xs font-medium">Virtual Scroll</span>
        </button>

        <button
          onClick={() => exportToCsv(processedRows)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-all active:scale-95"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>
    </div>
  )
}
