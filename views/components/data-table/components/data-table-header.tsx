"use client";

import { flexRender } from "@tanstack/react-table";
import { Column } from "@tanstack/table-core";
import { useEffect } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { useTableDataStore } from "~/store/client/table-data";
import { DataTableActionsMenu } from "~/views/components/data-table/components/data-table-actions-menu";
import { Badge } from "~/views/components/ui/badge";
import { Button } from "~/views/components/ui/button";
import { TableHead, TableHeader, TableRow } from "~/views/components/ui/table";
import { useDataTable } from "../hooks/use-data-table";

export const DataTableHeader = <TData, TValue>() => {
  const table = useDataTable<TData>();

  const setAllColumns = useTableDataStore((state) => state.setAllColumns);

  useEffect(() => {
    const columns = table.getAllColumns().map((column) => column.id);
    setAllColumns(columns);
  }, [setAllColumns, table]);

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
                {header.column.getCanSort() && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleMultiSortByClick(
                        header.column as Column<TData, TValue>
                      )
                    }
                    className="relative"
                  >
                    {header.column.getIsSorted() === "asc" && <FaSortAlphaUp />}
                    {header.column.getIsSorted() === "desc" && (
                      <FaSortAlphaDown />
                    )}
                    {!header.column.getIsSorted() &&
                      header.column.getCanSort() && (
                        <FaSortAlphaUp className="opacity-0 group-hover:opacity-40 transition-opacity" />
                      )}
                    {header.column.getIsSorted() &&
                      table.getState().sorting.length > 1 && (
                        <Badge size="xs" className="absolute top-0 right-0">
                          {table
                            .getState()
                            .sorting.findIndex(
                              (s) => s.id === header.column.id
                            ) + 1}
                        </Badge>
                      )}
                  </Button>
                )}

                <DataTableActionsMenu column={header.column} />
              </div>
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};
