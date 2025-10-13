import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParamsActions } from "~/lib/hooks/use-search-params-actions";

export const usePagination = <T>(data: T[]) => {
  const searchParams = useSearchParams();
  const { set } = useSearchParamsActions();
  const pageIndex = Number(searchParams.get("page")) || 1;
  const normalizedPageIndex = Math.max(pageIndex - 1, 0);

  const [pagination, setPagination] = useState({
    pageIndex: normalizedPageIndex,
    pageSize: 10,
  });

  const totalPages = Math.ceil(data.length / pagination.pageSize);

  useEffect(() => {
    const maxPageIndex = Math.max(0, totalPages - 1);

    if (pagination.pageIndex < 0 || pagination.pageIndex > maxPageIndex) {
      const correctedPage = Math.min(normalizedPageIndex, maxPageIndex);

      setPagination((prev) => ({ ...prev, pageIndex: correctedPage }));
      set("page", (correctedPage + 1).toString());
    }
  }, [normalizedPageIndex, pagination.pageIndex, set, totalPages]);

  useEffect(() => {
    set("page", (pagination.pageIndex + 1).toString());
  }, [pagination.pageIndex, set]);

  return { pagination, setPagination };
};
