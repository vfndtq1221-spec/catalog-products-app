import {
  type FiltersState,
  DEFAULT_FILTERS,
  VALID_SORT_FIELDS,
  type SortField,
} from "./types";

export const parseFilters = (searchParams: URLSearchParams): FiltersState => {
  const q = searchParams.get("q") || DEFAULT_FILTERS.q;
  const category = searchParams.get("category") || DEFAULT_FILTERS.category;

  const rawSortBy = searchParams.get("sortBy");
  const sortBy = VALID_SORT_FIELDS.includes(rawSortBy as SortField)
    ? (rawSortBy as SortField)
    : DEFAULT_FILTERS.sortBy;

  const rawOrder = searchParams.get("order");
  const order =
    rawOrder === "asc" || rawOrder === "desc"
      ? rawOrder
      : DEFAULT_FILTERS.order;

  const modifiedAfter =
    searchParams.get("modifiedAfter") || DEFAULT_FILTERS.modifiedAfter;
  const modifiedBefore =
    searchParams.get("modifiedBefore") || DEFAULT_FILTERS.modifiedBefore;

  return { q, category, sortBy, order, modifiedAfter, modifiedBefore };
};

export const serializeFilters = (filters: FiltersState): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.category) params.set("category", filters.category);

  if (filters.sortBy && filters.order) {
    params.set("sortBy", filters.sortBy);
    params.set("order", filters.order);
  }

  if (filters.modifiedAfter) params.set("modifiedAfter", filters.modifiedAfter);
  if (filters.modifiedBefore)
    params.set("modifiedBefore", filters.modifiedBefore);

  return params;
};
