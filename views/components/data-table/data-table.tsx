"use client";
import {
  ColumnDef,
  flexRender,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { Column, Table as TableType } from "@tanstack/table-core";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { useSearchParamsActions } from "~/lib/hooks/use-search-params-actions";
import { cn } from "~/lib/utils";
import { Badge } from "~/views/components/ui/badge";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/views/components/ui/tooltip";
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

const DataTableHeader = <TData, TValue>() => {
  const table = useDataTable<TData>();

  const handleMultiSortByClick = (column: Column<TData, TValue>) => {
    if (!column.getCanSort()) return;

    table.setSorting((prev) => {
      const activeSortColumn = prev.find((col) => col.id === column?.id);

      if (!activeSortColumn) {
        return [...prev, { id: column?.id, desc: false }];
      }

      if (activeSortColumn && !activeSortColumn.desc) {
        return prev.map((col) =>
          col.id === column?.id ? { id: column?.id, desc: true } : col
        );
      }

      return prev.filter((col) => col.id !== column?.id);
    });
  };

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              onClick={() =>
                handleMultiSortByClick(header.column as Column<TData, TValue>)
              }
              style={{
                width: header.column.getSize(),
                minWidth: header.column.columnDef.minSize,
                maxWidth: header.column.columnDef.maxSize,
              }}
              className="group"
            >
              <div className="flex items-center gap-2">
                {!header.isPlaceholder &&
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                {header.column.getIsSorted() === "asc" && <FaSortAlphaUp />}
                {header.column.getIsSorted() === "desc" && <FaSortAlphaDown />}
                {!header.column.getIsSorted() && header.column.getCanSort() && (
                  <FaSortAlphaUp className="opacity-0 group-hover:opacity-40 transition-opacity" />
                )}
                {header.column.getIsSorted() && (
                  <Badge size="sm" variant="outline">
                    {table
                      .getState()
                      .sorting.findIndex((s) => s.id === header.column.id) + 1}
                  </Badge>
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};

type TruncatedCellContentProps = React.JSX.IntrinsicElements["div"];

const TruncatedCellContent = (props: TruncatedCellContentProps) => {
  const { children, className, ...rest } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    const checkTruncation = () => {
      if (contentRef.current) {
        const element = contentRef.current;

        const isTextTruncated =
          element.scrollWidth > element.clientWidth ||
          element.scrollHeight > element.clientHeight;

        setIsTruncated(isTextTruncated);

        const text = element.textContent || element.innerText || "";
        setTextContent(text);
      }
    };

    const rafId = requestAnimationFrame(() => {
      checkTruncation();
    });

    window.addEventListener("resize", checkTruncation);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", checkTruncation);
    };
  }, []);

  const cellContent = (
    <div
      ref={contentRef}
      className={cn("w-full truncate", className)}
      {...rest}
    >
      {children}
    </div>
  );

  if (isTruncated && textContent) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{cellContent}</TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs break-words">{textContent}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return cellContent;
};

const DataTableBody = () => {
  const table = useDataTable();

  const columnsCount = table.getAllColumns().length;

  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            onClick={() => row.toggleSelected()}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                  minWidth: cell.column.columnDef.minSize,
                  maxWidth: cell.column.columnDef.maxSize,
                }}
                className="hover:overflow-visible hover:whitespace-normal"
              >
                <TruncatedCellContent>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TruncatedCellContent>
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
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
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
      </div>
      <div className="flex items-center space-x-2">
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
        <div>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
      </div>
    </div>
  );
};
