"use client"

import { useEffect, useRef } from "react"

interface Props {
  value: string | number
  isEditing: boolean
  numeric?: boolean
  onChange: (value: string | number) => void
}

export function EmployeeTableCell({ value, isEditing, numeric, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  if (!isEditing) {
    return <div className="truncate">{numeric ? value.toLocaleString() : value}</div>
  }

  return (
    <input
      ref={inputRef}
      type={numeric ? "number" : "text"}
      value={value}
      onChange={(e) => onChange(numeric ? Number(e.target.value) : e.target.value)}
      className="w-full bg-white border border-indigo-200 rounded px-2 py-1 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
    />
  )
}
