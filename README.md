# Advanced Data Table - Employee Management System

A high-performance, enterprise-grade data table built with Next.js 14, designed to handle large datasets (10,000+ records) with seamless performance and a premium SaaS aesthetic.

## 🚀 Key Features

- **Large Dataset Handling**: Integrated `tanstack-virtual` for 60fps scrolling across 10,000+ rows without DOM bloat.
- **Multi-Column Sorting**: Support for sorting across multiple columns with priority indicators (1, 2, 3...) and direction toggling.
- **Dynamic Filtering**: Global search across all fields plus individual column filters for granular data discovery.
- **Inline Editing**: Real-time editing for text and numeric values with built-in validation and state management.
- **Dual Display Modes**: Toggle between **Virtual Scroll** (for rapid data browsing) and **Classic Pagination** (for structured data review).
- **Export Capabilities**: Direct-to-browser CSV export of filtered and sorted data.
- **Responsive Layout**: Fixed-column logic that ensures perfect header-body alignment even in virtualized modes.

## 🛠️ Technical Stack

- **Framework**: Next.js 14 (App Router)
- **State Management**: React Context API + `useReducer` for centralized, predictable state transitions.
- **Performance**: `@tanstack/react-virtual` for row virtualization.
- **Styling**: Tailwind CSS with a custom domain-driven design system (Slate & Indigo palette).
- **Icons**: Lucide React for consistent, lightweight iconography.

## 🏗️ Architectural Decisions

### Why `useReducer`?

For a table this complex, standard `useState` fragmentation leads to "state synchronization hell." I implemented a centralized `tableReducer` to handle interlinked actions—like clearing filters affecting pagination, or updating an edit map—ensuring the UI remains the single source of truth.

### Component Scalability

The components are broken down into small, domain-specific units (`EmployeeRow`, `EmployeeTableCell`, `EmployeeTableHeader`). This not only makes the code readable but also ensures that only the necessary parts of the DOM re-render during edits or sorts.

### Virtualization & Alignment

One of the hardest parts of virtualized tables is keeping absolute-positioned rows aligned with relative-positioned headers. I solved this by using a shared `COLUMNS` configuration with strict pixel widths and a `table-fixed` layout, providing a rock-solid UI at any scale.

## 🏃 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Assessment Requirements Checklist

- [x] Editable Table (Inline text/numeric)
- [x] Large Dataset (10,000+ rows)
- [x] Virtual Scrolling & Pagination
- [x] Multi-column Sorting
- [x] Text & Numeric Filtering
- [x] CSV Export
- [x] Premium SaaS UI/UX
