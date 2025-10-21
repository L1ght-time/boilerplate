import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParamsActions } from "~/lib/hooks/use-search-params-actions";

const pageSize = 10;

export const usePagination = <T>(data: T[]) => {
  const searchParams = useSearchParams();
  const { set } = useSearchParamsActions();

  const pageIndexFromUrl = Number(searchParams.get("page")) || 1;
  const currentPageIndex = Math.max(pageIndexFromUrl - 1, 0);

  const totalPages = Math.ceil(data.length / pageSize);
  const lastPageIndex = totalPages - 1;

  const normalizedPageIndex = Math.min(currentPageIndex, lastPageIndex);

  const [pagination, setPagination] = useState({
    pageIndex: normalizedPageIndex,
    pageSize,
  });

  useEffect(() => {
    if (pagination.pageIndex > lastPageIndex) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: normalizedPageIndex,
      }));
      return;
    }

    set("page", (pagination.pageIndex + 1).toString());
  }, [
    lastPageIndex,
    normalizedPageIndex,
    currentPageIndex,
    pageIndexFromUrl,
    pagination,
    set,
    totalPages,
  ]);

  return { pagination, setPagination };
};
