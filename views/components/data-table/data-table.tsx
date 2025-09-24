"use client";

import {
  ColumnDef,
  flexRender,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";

import { Table as TableType } from "@tanstack/table-core";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/views/components/ui/table";

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

  return (
    <Table>
      <DataTableHeader table={table} />
      <DataTableBody table={table} />
    </Table>
  );
};

type DataTableHeaderProps<TData> = React.JSX.IntrinsicElements["thead"] & {
  table: TableType<TData>;
};

const DataTableHeader = <TData,>(props: DataTableHeaderProps<TData>) => {
  const { table, ...rest } = props;

  return (
    <TableHeader {...rest}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {!header.isPlaceholder &&
                flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};

type DataTableBodyProps<TData> = React.JSX.IntrinsicElements["tbody"] & {
  table: TableType<TData>;
};

const DataTableBody = <TData,>(props: DataTableBodyProps<TData>) => {
  const { table, ...rest } = props;

  const columnsCount = table.getAllColumns().length;

  return (
    <TableBody {...rest}>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <DataTableEmpty size={columnsCount} />
      )}
    </TableBody>
  );
};

type DataTableEmptyProps = React.JSX.IntrinsicElements["tr"] & {
  size: number;
};

const DataTableEmpty = (props: DataTableEmptyProps) => {
  const { size, children } = props;

  return (
    <TableRow>
      <TableCell colSpan={size} className="h-24 text-center">
        {children || "No results."}
      </TableCell>
    </TableRow>
  );
};
