"use client";
import { Table as TableType } from "@tanstack/table-core";
import { useContext } from "react";
import { DataTableContext } from "../components/data-table-context";

export const useDataTable = <TData>() => {
  const ctx = useContext(DataTableContext);
  if (!ctx) {
    throw new Error("useDataTable must be used within DataTableProvider");
  }
  return ctx as TableType<TData>;
};
