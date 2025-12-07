"use client";

import { Column } from "@tanstack/react-table";
import { FaFilter, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { GrUnsorted } from "react-icons/gr";
import { HiDotsVertical } from "react-icons/hi";
import { useToggle } from "react-use";
import { cn } from "~/lib/utils";
import { useDataTable } from "~/views/components/data-table/hooks";
import { Button } from "~/views/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/views/components/ui/dropdown-menu";
import { SelectSeparator } from "~/views/components/ui/select";

type DataTableActionsMenuProps<TData, TValue> = {
  column: Column<TData, TValue>;
};

export const DataTableActionsMenu = <TData, TValue>(
  props: DataTableActionsMenuProps<TData, TValue>
) => {
  const { column } = props;
  const table = useDataTable<TData>();

  const [open, toggleOpen] = useToggle(false);

  const canSort = table.getColumn(column.id)?.getCanSort();
  const isSorted = table.getColumn(column.id)?.getIsSorted();

  if (!canSort) return;

  return (
    <DropdownMenu open={open} onOpenChange={toggleOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "opacity-0 group-hover:opacity-100 transition-opacity",
            open && "opacity-100"
          )}
        >
          <HiDotsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuGroup>
          {isSorted !== "asc" && (
            <DropdownMenuItem
              onClick={() => table.setSorting([{ id: column.id, desc: false }])}
            >
              <FaSortAlphaUp />
              Sort by ASC
            </DropdownMenuItem>
          )}
          {isSorted !== "desc" && (
            <DropdownMenuItem
              onClick={() => table.setSorting([{ id: column.id, desc: true }])}
            >
              <FaSortAlphaDown /> Sort by DESC
            </DropdownMenuItem>
          )}
          {isSorted && (
            <DropdownMenuItem onClick={() => table.setSorting([])}>
              <GrUnsorted />
              Unsort
            </DropdownMenuItem>
          )}

          <SelectSeparator />

          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => {}}>
            <FaFilter />
            Filter
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
