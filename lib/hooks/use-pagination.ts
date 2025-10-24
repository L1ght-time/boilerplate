import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParamsActions } from "~/lib/hooks/use-search-params-actions";

export const usePagination = <T>(data: T[]) => {
  const searchParams = useSearchParams();
  const { merge } = useSearchParamsActions();

  const pageSize = Number(searchParams.get("pageSize"));
  const pageIndexFromUrl = Number(searchParams.get("page")) || 1;
  const currentPageIndex = Math.max(pageIndexFromUrl - 1, 0);

  const totalPages = Math.ceil(data.length / Number(pageSize));
  const lastPageIndex = totalPages - 1;

  const normalizedPageIndex = Math.min(currentPageIndex, lastPageIndex);

  const [pagination, setPagination] = useState({
    pageIndex: normalizedPageIndex,
    pageSize: pageSize ? pageSize : 10,
  });

  useEffect(() => {
    if (pagination.pageIndex > lastPageIndex) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: normalizedPageIndex,
      }));
      return;
    }

    merge({
      page: (pagination.pageIndex + 1).toString(),
      pageSize: pagination.pageSize.toString(),
    });
  }, [
    lastPageIndex,
    normalizedPageIndex,
    currentPageIndex,
    pageIndexFromUrl,
    pagination,
    merge,
    totalPages,
    pageSize,
  ]);

  return { pagination, setPagination };
};
