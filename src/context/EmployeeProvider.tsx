"use client";

import { createContext, useContext, useReducer, useMemo } from "react";
import type {
  Employee,
  FilterState,
  RowEdit,
  SortState,
} from "@/types/employee";
import { generateEmployees } from "@/lib/generateData";

interface TableState {
  rows: Employee[];
  edits: Map<number, RowEdit>;
  sort: SortState;
  filters: FilterState;
  page: number;
  pageSize: number;
  useVirtualScroll: boolean;
}

type Action =
  | { type: "START_EDIT"; id: number }
  | {
      type: "UPDATE_EDIT";
      id: number;
      field: keyof Employee;
      value: string | number;
    }
  | { type: "SAVE_ROW"; id: number }
  | { type: "CANCEL_EDIT"; id: number }
  | { type: "SET_SORT"; column: keyof Employee }
  | { type: "SET_GLOBAL_FILTER"; value: string }
  | { type: "SET_COLUMN_FILTER"; column: keyof Employee; value: string }
  | { type: "CLEAR_FILTERS" }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_PAGE_SIZE"; size: number }
  | { type: "TOGGLE_SCROLL_MODE" };

const initialState: TableState = {
  rows: generateEmployees(10000),
  edits: new Map(),
  sort: [],
  filters: { global: "", column: {} },
  page: 0,
  pageSize: 50,
  useVirtualScroll: true,
};

function tableReducer(state: TableState, action: Action): TableState {
  switch (action.type) {
    case "START_EDIT": {
      const row = state.rows.find((r) => r.id === action.id);
      if (!row) return state;
      const newEdits = new Map(state.edits);
      newEdits.set(action.id, { original: { ...row }, current: { ...row } });
      return { ...state, edits: newEdits };
    }
    case "UPDATE_EDIT": {
      const edit = state.edits.get(action.id);
      if (!edit) return state;
      const newEdits = new Map(state.edits);
      newEdits.set(action.id, {
        ...edit,
        current: { ...edit.current, [action.field]: action.value },
      });
      return { ...state, edits: newEdits };
    }
    case "SAVE_ROW": {
      const edit = state.edits.get(action.id);
      if (!edit) return state;
      const newRows = state.rows.map((r) =>
        r.id === action.id ? edit.current : r,
      );
      const newEdits = new Map(state.edits);
      newEdits.delete(action.id);
      return { ...state, rows: newRows, edits: newEdits };
    }
    case "CANCEL_EDIT": {
      const newEdits = new Map(state.edits);
      newEdits.delete(action.id);
      return { ...state, edits: newEdits };
    }
    case "SET_SORT": {
      const current = state.sort.find((s) => s.key === action.column);
      let newSort: SortState = [];

      if (!current) {
        newSort = [...state.sort, { key: action.column, direction: "asc" }];
      } else if (current.direction === "asc") {
        newSort = state.sort.map((s) =>
          s.key === action.column ? { ...s, direction: "desc" } : s,
        );
      } else {
        newSort = state.sort.filter((s) => s.key !== action.column);
      }
      return { ...state, sort: newSort };
    }
    case "SET_GLOBAL_FILTER":
      return {
        ...state,
        filters: { ...state.filters, global: action.value },
        page: 0,
      };
    case "SET_COLUMN_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          column: { ...state.filters.column, [action.column]: action.value },
        },
        page: 0,
      };
    case "CLEAR_FILTERS":
      return { ...state, filters: { global: "", column: {} }, page: 0 };
    case "SET_PAGE":
      return { ...state, page: action.page };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.size, page: 0 };
    case "TOGGLE_SCROLL_MODE":
      return { ...state, useVirtualScroll: !state.useVirtualScroll, page: 0 };
    default:
      return state;
  }
}

interface TableContextValue {
  state: TableState;
  dispatch: React.Dispatch<Action>;
  processedRows: Employee[];
}

const EmployeeTableContext = createContext<TableContextValue | undefined>(
  undefined,
);

export function EmployeeProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(tableReducer, initialState);

  const processedRows = useMemo(() => {
    let result = [...state.rows];

    if (state.filters.global) {
      const query = state.filters.global.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(query),
        ),
      );
    }

    Object.entries(state.filters.column).forEach(([col, val]) => {
      if (!val) return;
      const query = val.toLowerCase();
      result = result.filter((row) =>
        String(row[col as keyof Employee])
          .toLowerCase()
          .includes(query),
      );
    });

    if (state.sort.length > 0) {
      result.sort((a, b) => {
        for (const { key, direction } of state.sort) {
          const valA = a[key];
          const valB = b[key];
          if (valA === valB) continue;

          const multiplier = direction === "asc" ? 1 : -1;
          return valA < valB ? -1 * multiplier : 1 * multiplier;
        }
        return 0;
      });
    }

    return result;
  }, [state.rows, state.filters, state.sort]);

  return (
    <EmployeeTableContext.Provider value={{ state, dispatch, processedRows }}>
      {children}
    </EmployeeTableContext.Provider>
  );
}

export function useEmployeeTable() {
  const context = useContext(EmployeeTableContext);
  if (!context)
    throw new Error("useEmployeeTable must be used within EmployeeProvider");
  return context;
}
