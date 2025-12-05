"use client";

import { cn } from "~/lib/utils";
import { Badge } from "~/views/components/ui/badge";

type Status = "active" | "inactive" | "pending";

type DataTableStatusProps = React.JSX.IntrinsicElements["span"] & {
  status: Status;
};

const statusConfig: Record<Status, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-blue-500 text-white border-transparent",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-500 text-white border-transparent",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-500 text-white border-transparent",
  },
};

export const DataTableStatus = (props: DataTableStatusProps) => {
  const { status, className, ...rest } = props;
  const config = statusConfig[status];

  return (
    <Badge
      className={cn("w-20 justify-center", config.className, className)}
      {...rest}
    >
      {config.label}
    </Badge>
  );
};
