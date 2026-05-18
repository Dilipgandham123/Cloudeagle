import type { Department, Employee, Status } from "@/types/employee"

const firstNames = ["James", "Sarah", "Michael", "Emma", "David", "Olivia", "Daniel", "Sophia", "Ryan", "Isabella", "Ethan", "Mia", "Andrew", "Charlotte", "Joshua", "Amelia", "Matthew", "Harper", "Christopher", "Evelyn", "Arun", "Priya", "Rahul", "Ananya", "Vikram", "Neha", "Arjun", "Kavya", "Rohan", "Divya"]
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Wilson", "Taylor", "Kumar", "Sharma", "Patel", "Singh", "Reddy", "Nair", "Iyer", "Gupta", "Mehta", "Shah"]
const departments: Department[] = ["Engineering", "Sales", "HR", "Finance", "Marketing", "Operations", "Product", "Legal"]
const statuses: Status[] = ["Active", "Active", "Active", "Inactive", "On Leave"]

const rolesByDept: Record<Department, string[]> = {
  Engineering: ["Software Engineer", "Senior Engineer", "Staff Engineer", "Engineering Manager", "Tech Lead"],
  Sales: ["Sales Rep", "Account Executive", "Sales Manager", "VP of Sales", "SDR"],
  HR: ["HR Generalist", "Recruiter", "HR Manager", "People Ops", "Talent Partner"],
  Finance: ["Analyst", "Senior Analyst", "Finance Manager", "Controller", "CFO"],
  Marketing: ["Marketing Manager", "Content Writer", "SEO Specialist", "Brand Manager", "Growth Lead"],
  Operations: ["Ops Manager", "Business Analyst", "Project Manager", "Scrum Master", "COO"],
  Product: ["Product Manager", "Senior PM", "Product Designer", "UX Researcher", "CPO"],
  Legal: ["Legal Counsel", "Compliance Officer", "Paralegal", "General Counsel", "Contract Manager"],
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate(start: Date, end: Date) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return d.toISOString().split("T")[0]
}

export function generateEmployees(count = 10000): Employee[] {
  return Array.from({ length: count }, (_, i) => {
    const dept = pick(departments)
    const firstName = pick(firstNames)
    const lastName = pick(lastNames)
    const age = randomBetween(22, 58)
    const experience = randomBetween(1, Math.min(age - 21, 30))

    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@company.com`,
      department: dept,
      role: pick(rolesByDept[dept]),
      salary: randomBetween(40000, 200000),
      age,
      experience,
      status: pick(statuses),
      joinedAt: randomDate(new Date(2015, 0, 1), new Date(2024, 11, 31)),
    }
  })
}
