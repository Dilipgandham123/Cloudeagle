"use client"

import { memo } from "react"
import { Pencil, Check, X } from "lucide-react"
import { useEmployeeTable } from "@/context/EmployeeProvider"
import { EmployeeTableCell } from "./EmployeeTableCell"
import type { Employee } from "@/types/employee"
import { cn } from "@/lib/utils"

interface Props {
  row: Employee
  columns: any[]
  style?: React.CSSProperties
}

const statusColors: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Inactive: "bg-slate-50 text-slate-600 border-slate-100",
  "On Leave": "bg-amber-50 text-amber-700 border-amber-100",
}

export const EmployeeRow = memo(function EmployeeRow({ row, columns, style }: Props) {
  const { state, dispatch } = useEmployeeTable()
  const edit = state.edits.get(row.id)
  const isEditing = !!edit
  const data = edit?.current ?? row

  function renderField(key: keyof Employee) {
    return (
      <EmployeeTableCell
        value={data[key] as string | number}
        isEditing={isEditing}
        numeric={typeof row[key] === "number"}
        onChange={(val) => dispatch({ type: "UPDATE_EDIT", id: row.id, field: key, value: val })}
      />
    )
  }

  return (
    <tr
      style={style}
      className={cn(
        "group border-b border-slate-100 hover:bg-slate-50/50 transition-colors",
        isEditing && "bg-indigo-50/30 border-indigo-100 shadow-sm"
      )}
    >
      {columns.map((col) => (
        <td
          key={col.key}
          style={{ width: col.width }}
          className={cn(
            "px-4 py-2.5 text-sm",
            col.numeric ? "text-right" : "text-left",
            col.key === "id" || col.key === "joinedAt" ? "text-xs text-slate-400 tabular-nums" : "",
            col.key === "name" ? "text-slate-900 font-medium" : "text-slate-600"
          )}
        >
          {col.key === "status" && !isEditing ? (
            <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full border shadow-sm", statusColors[row.status])}>
              {row.status}
            </span>
          ) : (
            renderField(col.key)
          )}
        </td>
      ))}
      <td className="px-4 py-2.5">
        <div className="flex items-center gap-1">
          {!isEditing ? (
            <button
              onClick={() => dispatch({ type: "START_EDIT", id: row.id })}
              className="p-1.5 rounded-md hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-all"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          ) : (
            <>
              <button
                onClick={() => dispatch({ type: "SAVE_ROW", id: row.id })}
                className="p-1.5 rounded-md hover:bg-emerald-50 text-emerald-600 transition-colors"
                title="Save"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => dispatch({ type: "CANCEL_EDIT", id: row.id })}
                className="p-1.5 rounded-md hover:bg-rose-50 text-rose-600 transition-colors"
                title="Cancel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  )
})
