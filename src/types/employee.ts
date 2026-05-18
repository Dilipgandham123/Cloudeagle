export type Department = "Engineering" | "Sales" | "HR" | "Finance" | "Marketing" | "Operations" | "Product" | "Legal"

export type Status = "Active" | "Inactive" | "On Leave"

export interface Employee {
  id: number
  name: string
  email: string
  department: Department
  role: string
  salary: number
  age: number
  experience: number
  status: Status
  joinedAt: string
}

export interface SortRule {
  key: keyof Employee
  direction: "asc" | "desc"
}

export type SortState = SortRule[]

export interface FilterState {
  global: string
  column: Partial<Record<keyof Employee, string>>
}

export interface RowEdit {
  original: Employee
  current: Employee
}
