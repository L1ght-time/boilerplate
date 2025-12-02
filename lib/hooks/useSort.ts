import { SortingState } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParamsActions } from "~/lib/hooks/use-search-params-actions";

export const useSort = () => {
  const searchParams = useSearchParams();
  const { merge } = useSearchParamsActions();

  const sortingParams = searchParams.get("sort");

  const [sorting, setSorting] = useState<SortingState>(
    sortingParams ? JSON.parse(sortingParams) : []
  );

  useEffect(() => {
    if (!sorting.length) {
      merge({
        sort: null,
      });
    } else {
      merge({
        sort: JSON.stringify(sorting),
      });
    }
  }, [merge, sorting]);

  return { sorting, setSorting };
};
