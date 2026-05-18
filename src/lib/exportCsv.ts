import type { Employee } from "@/types/employee"

export function exportToCsv(data: Employee[], filename = "employees.csv") {
  const headers = ["ID", "Name", "Email", "Department", "Role", "Salary", "Age", "Experience (yrs)", "Status", "Joined At"]

  const rows = data.map((e) => [
    e.id,
    `"${e.name}"`,
    e.email,
    e.department,
    `"${e.role}"`,
    e.salary,
    e.age,
    e.experience,
    e.status,
    e.joinedAt,
  ])

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
