"use client";

import {
  ColumnDef,
  flexRender,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { Table as TableType } from "@tanstack/table-core";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParamsActions } from "~/lib/hooks/use-search-params-actions";
import { Button } from "~/views/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/views/components/ui/select";

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

const DataTableContext = createContext({});

export const useDataTable = <TData,>() => {
  const ctx = useContext(DataTableContext);
  if (!ctx) {
    throw new Error("useDataTable must be used within DataTableProvider");
  }
  return ctx as TableType<TData>;
};

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
      <div>
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

const DataTableHeader = () => {
  const table = useDataTable();

  return (
    <TableHeader>
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

const DataTableBody = () => {
  const table = useDataTable();

  const columnsCount = table.getAllColumns().length;

  return (
    <TableBody>
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

const rowsCountOnPage = [10, 20, 30, 40, 50];

const DataTableNavigation = () => {
  const { set } = useSearchParamsActions();
  const table = useDataTable();

  const [pageSize, setPageSize] = useState("10");

  useEffect(() => {
    set("pageSize", pageSize);
  }, [pageSize, set]);

  return (
    <div className={"flex items-center space-x-2"}>
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeft />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRight />
      </Button>
      <div>
        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>
      <Select
        onValueChange={(value) => {
          table.setPageSize(Number(value));
          setPageSize(value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Show ${pageSize}`} />
        </SelectTrigger>
        <SelectContent>
          {rowsCountOnPage.map((item) => (
            <SelectItem key={item} value={item.toString()}>
              Show {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
