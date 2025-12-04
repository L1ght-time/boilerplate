"use client";

import { flexRender } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "~/views/components/ui/table";
import { useDataTable } from "../hooks/use-data-table";
import { DataTableEmpty } from "./data-table-empty";
import { TruncatedCellContent } from "./truncated-cell-content";

export const DataTableBody = () => {
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
