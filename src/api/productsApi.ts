import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, ProductsResponse, GetProductsArgs } from "./types.ts";


export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Product", "ProductList"],
  endpoints: (build) => ({
    getProducts: build.infiniteQuery<ProductsResponse, GetProductsArgs, number>(
      {
        infiniteQueryOptions: {
          initialPageParam: 0,
          getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + lastPage.limit;
            return nextSkip < lastPage.total ? nextSkip : undefined;
          },
        },
        query: ({ queryArg, pageParam }) => {
          const {
            limit = 12,
            q,
            category,
            sortBy,
            order,
            modifiedAfter,
            modifiedBefore,
          } = queryArg;

          
          let path = "/products";
          if (q) {
            path = "/products/search";
          } else if (category) {
            path = `/products/category/${encodeURIComponent(category)}`;
          }

          const params = new URLSearchParams();
          params.set("limit", String(limit));
          params.set("skip", String(pageParam));

          
          if (q) params.set("q", q);

          if (sortBy && order) {
            params.set("sortBy", sortBy);
            params.set("order", order);
          }

          if (modifiedAfter) params.set("modifiedAfter", modifiedAfter);
          if (modifiedBefore) params.set("modifiedBefore", modifiedBefore);

          return `${path}?${params.toString()}`;
        },
      },
    ),

    getProductById: build.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    getCategories: build.query<string[], void>({
      query: () => "/products/category-list",
    }),
  }),
});

export const {
  useGetProductsInfiniteQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
} = productsApi;
