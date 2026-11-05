import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { parseFilters, serializeFilters } from "./filtersUtils";
import { type FiltersState } from "./types";
import type { GetProductsArgs } from "../../api/types";

export const toApiArgs = (filters: FiltersState): GetProductsArgs => ({
  q: filters.q || undefined,
  category: filters.category || undefined,
  sortBy: filters.sortBy || undefined,
  order: filters.order || undefined,
  modifiedAfter: filters.modifiedAfter || undefined,
  modifiedBefore: filters.modifiedBefore || undefined,
});

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    return parseFilters(searchParams);
  }, [searchParams]);

  const setFilters = useCallback(
    (newFilters: Partial<FiltersState>) => {
      setSearchParams((prev) => {
        const currentFilters = parseFilters(prev);

        const mergedFilters = { ...currentFilters, ...newFilters };

        return serializeFilters(mergedFilters);
      });
    },
    [setSearchParams],
  );

  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return { filters, setFilters, resetFilters };
};
