"use client";

import { TableCell, TableRow } from "~/views/components/ui/table";

type DataTableEmptyProps = React.JSX.IntrinsicElements["tr"] & {
  size: number;
};

export const DataTableEmpty = (props: DataTableEmptyProps) => {
  const { size, children } = props;

  return (
    <TableRow>
      <TableCell colSpan={size} className="h-24 text-center">
        {children || "No results."}
      </TableCell>
    </TableRow>
  );
};
