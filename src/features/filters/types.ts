export type SortField = "price" | "title" | "rating" | "discountPercentage";
export type SortOrder = "asc" | "desc";

export interface FiltersState {
  q: string;
  category: string;
  sortBy: SortField | "";
  order: SortOrder | "";
  modifiedAfter: string;
  modifiedBefore: string;
}

export const DEFAULT_FILTERS: FiltersState = {
  q: "",
  category: "",
  sortBy: "",
  order: "",
  modifiedAfter: "",
  modifiedBefore: "",
};

export const VALID_SORT_FIELDS: SortField[] = [
  "price",
  "title",
  "rating",
  "discountPercentage",
];
