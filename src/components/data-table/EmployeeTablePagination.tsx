"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useEmployeeTable } from "@/context/EmployeeProvider"
import { cn } from "@/lib/utils"

export function EmployeeTablePagination() {
  const { state, processedRows, dispatch } = useEmployeeTable()
  const totalPages = Math.ceil(processedRows.length / state.pageSize)
  const page = state.page

  const pages = Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
    if (totalPages <= 7) return i
    if (page < 4) return i
    if (page > totalPages - 4) return totalPages - 7 + i
    return page - 3 + i
  })

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/30">
      <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
        <span>Show</span>
        <select
          value={state.pageSize}
          onChange={(e) => dispatch({ type: "SET_PAGE_SIZE", size: Number(e.target.value) })}
          className="bg-white border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          {[25, 50, 100, 200].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span>
          {page * state.pageSize + 1} – {Math.min((page + 1) * state.pageSize, processedRows.length)} of{" "}
          {processedRows.length.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <NavButton
          onClick={() => dispatch({ type: "SET_PAGE", page: 0 })}
          disabled={page === 0}
          icon={<ChevronsLeft className="w-4 h-4" />}
        />
        <NavButton
          onClick={() => dispatch({ type: "SET_PAGE", page: page - 1 })}
          disabled={page === 0}
          icon={<ChevronLeft className="w-4 h-4" />}
        />

        <div className="flex items-center gap-1 mx-1">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => dispatch({ type: "SET_PAGE", page: p })}
              className={cn(
                "w-8 h-8 text-xs font-semibold rounded-md transition-all",
                p === page
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                  : "text-slate-500 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200"
              )}
            >
              {p + 1}
            </button>
          ))}
        </div>

        <NavButton
          onClick={() => dispatch({ type: "SET_PAGE", page: page + 1 })}
          disabled={page >= totalPages - 1}
          icon={<ChevronRight className="w-4 h-4" />}
        />
        <NavButton
          onClick={() => dispatch({ type: "SET_PAGE", page: totalPages - 1 })}
          disabled={page >= totalPages - 1}
          icon={<ChevronsRight className="w-4 h-4" />}
        />
      </div>
    </div>
  )
}

function NavButton({ onClick, disabled, icon }: { onClick: () => void; disabled: boolean; icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-1.5 rounded-md text-slate-400 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
    >
      {icon}
    </button>
  )
}
