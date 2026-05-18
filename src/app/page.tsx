"use client"

import { EmployeeProvider } from "@/context/EmployeeProvider"
import { EmployeeTable } from "@/components/data-table/EmployeeTable"
import { EmployeeControls } from "@/components/data-table/EmployeeControls"

export default function EmployeeDashboard() {
  return (
    <EmployeeProvider>
      <div className="flex flex-col h-screen p-6 gap-6 max-w-[1600px] mx-auto w-full">
        <header>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Employee Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your workforce with high-performance virtualization and multi-column sorting.
          </p>
        </header>

        <section>
          <EmployeeControls />
        </section>

        <main className="flex-1 min-h-0 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <EmployeeTable />
        </main>
      </div>
    </EmployeeProvider>
  )
}
