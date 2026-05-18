import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Employee Data Table",
  description: "High-performance editable data table with 10,000+ rows",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
