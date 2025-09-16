"use client";

import { ColumnDef, TableOptions, useReactTable } from "@tanstack/react-table";
import { Table } from "~/views/components/ui/table";

type DataTableProps<TData, TValue> = {
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

  return <Table>DataTable</Table>;
};
