import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParamsActions } from "~/lib/hooks/use-search-params-actions";

export const usePagination = <T>(data: T[]) => {
  const searchParams = useSearchParams();
  const { set } = useSearchParamsActions();
  const pageIndex = Number(searchParams.get("page")) || 1;
  const normalizedToMinPageIndex = Math.max(pageIndex - 1, 0);

  const [pagination, setPagination] = useState({
    pageIndex: normalizedToMinPageIndex,
    pageSize: 10,
  });

  const totalPages = Math.ceil(data.length / pagination.pageSize);
  const maxPageIndex = Math.max(0, totalPages - 1);

  const normalizedToMaxPageIndex = Math.min(
    normalizedToMinPageIndex,
    maxPageIndex
  );

  useEffect(() => {
    if (pagination.pageIndex > maxPageIndex) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: normalizedToMaxPageIndex,
      }));
      return;
    }

    set("page", (pagination.pageIndex + 1).toString());
  }, [
    maxPageIndex,
    normalizedToMaxPageIndex,
    normalizedToMinPageIndex,
    pageIndex,
    pagination.pageIndex,
    set,
    totalPages,
  ]);

  return { pagination, setPagination };
};
