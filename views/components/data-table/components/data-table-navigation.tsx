"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParamsActions } from "~/lib/hooks/use-search-params-actions";
import { Button } from "~/views/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/views/components/ui/select";
import { useDataTable } from "../hooks/use-data-table";

export const rowsCountOnPage = [10, 20, 30, 40, 50];

export const DataTableNavigation = () => {
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
