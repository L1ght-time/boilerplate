"use client";
import { ColumnDef, TableOptions, useReactTable } from "@tanstack/react-table";
import { Table } from "~/views/components/ui/table";
import {
  DataTableBody,
  DataTableContext,
  DataTableHeader,
  DataTableNavigation,
} from "./components";

export type DataTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
} & TableOptions<TData>;

export const DataTable = <TData, TValue>(
  props: DataTableProps<TData, TValue>
) => {
  const { data, columns, ...options } = props;

  const table = useReactTable({
    data,
    columns,
    ...options,
  });

  return (
    <DataTableContext.Provider value={table}>
      <div className="space-y-2">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <DataTableHeader />
            <DataTableBody />
          </Table>
        </div>
        <DataTableNavigation />
      </div>
    </DataTableContext.Provider>
  );
};
