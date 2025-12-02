"use client";

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { formatDistanceToNow, parseISO } from "date-fns";
import { usePagination } from "~/lib/hooks/use-pagination";
import { useSort } from "~/lib/hooks/useSort";
import { User } from "~/types/entities/user";
import { DataTable } from "~/views/components/data-table/data-table";
import { Checkbox } from "~/views/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/views/components/ui/tooltip";

const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ getValue }) => {
      const date = parseISO(getValue<string>());

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{formatDistanceToNow(date)}</TooltipTrigger>
            <TooltipContent>{date.toDateString()}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];

type UsersTableSectionProps = {
  users: User[];
};

export const UsersTableSection = (props: UsersTableSectionProps) => {
  const { users } = props;

  const { sorting, setSorting } = useSort();
  const { pagination, setPagination } = usePagination<User>(users);

  const options = {
    data: users,
    columns,
    state: { pagination, sorting },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    isMultiSortEvent: () => true,
  };

  return (
    <div className="w-full p-5">
      <DataTable {...options} />
    </div>
  );
};
