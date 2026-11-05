import { useGetProductsInfiniteQuery } from "../../api/productsApi";
import { CategorySelect } from "../../components/filters/CategorySelect/CategorySelect";
import { DateRangeFilter } from "../../components/filters/DateRangeFilter/DateRangeFilter";
import { SortControls } from "../../components/filters/SortControls/SortControls";
import { toApiArgs, useFilters } from "../../features/filters/userFilters";
import { ProductCard } from "../../components/product/ProductCard/ProductCard";

import styles from "./CatalogPage.module.scss";
import { InfiniteScrollTrigger } from "../../components/ui/InfiniteScrollTrigger/InfiniteScrollTrigger";
import { SearchInput } from "../../components/filters/SearchInput/SearchInput";

export const CatalogPage = () => {
  const { filters, setFilters, resetFilters } = useFilters();
  const apiArgs = toApiArgs(filters);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProductsInfiniteQuery(apiArgs);

  if (isLoading) {
    return (
      <div className={styles.stateCard} role="status" aria-live="polite">
        <span className={styles.spinner} aria-hidden="true" />
        <span>Загружаем каталог...</span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={`${styles.stateCard} ${styles.errorState}`} role="alert">
        Не удалось загрузить каталог. Проверьте подключение к интернету и попробуйте
        обновить страницу.
      </div>
    );
  }

  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  return (
    <div className={styles.page}>
      
      
      <div className={styles.topControls}>
        
        <div className={styles.fullWidthSearch}>
           <SearchInput />
        </div>

        
        <div className={styles.filtersRow}>
          <div className={styles.filterItem}>
            <CategorySelect 
              value={filters.category} 
              onChange={(category) => setFilters({ category })} 
            />
          </div>
          <div className={styles.filterItem}>
            <SortControls 
              sortBy={filters.sortBy} 
              order={filters.order} 
              onChange={(sortBy, order) => setFilters({ sortBy, order })} 
            />
          </div>
          <div className={styles.filterItem}>
            <DateRangeFilter 
              modifiedAfter={filters.modifiedAfter}
              modifiedBefore={filters.modifiedBefore}
              onChange={(after, before) => setFilters({ modifiedAfter: after, modifiedBefore: before })}
            />
          </div>
        </div>
        <button className={styles.resetButton} type="button" onClick={resetFilters}>
          Сбросить фильтры
        </button>
      </div>

      
      <div className={styles.content}>
        {allProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon} aria-hidden="true">⌕</span>
            <h2>Ничего не найдено</h2>
            <p>Попробуйте изменить поисковый запрос или сбросить фильтры.</p>
            <button className={styles.resetButton} type="button" onClick={resetFilters}>
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <InfiniteScrollTrigger 
          onIntersect={() => fetchNextPage()} 
          isLoading={isFetchingNextPage} 
          hasNextPage={hasNextPage} 
        />
      </div>

    </div>
  );
};