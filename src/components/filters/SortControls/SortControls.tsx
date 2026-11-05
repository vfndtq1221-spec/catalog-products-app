import styles from "./SortControls.module.scss";
import type { SortField, SortOrder } from "../../../features/filters/types";

interface SortControlsProps {
  sortBy: SortField | "";
  order: SortOrder | "";
  onChange: (sortBy: SortField | "", order: SortOrder | "") => void;
}

export const SortControls = ({
  sortBy,
  order,
  onChange,
}: SortControlsProps) => {
  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value as SortField | "";
    const newOrder = newSortBy ? order || "asc" : "";
    onChange(newSortBy, newOrder);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(sortBy, e.target.value as SortOrder);
  };

  return (
    <div className={styles.container}>
      <div className={styles.control}>
        <label className={styles.label}>Сортировка</label>
        <select
          className={styles.select}
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value="">Без сортировки</option>
          <option value="price">По цене</option>
          <option value="title">По названию</option>
          <option value="rating">По рейтингу</option>
          <option value="discountPercentage">По размеру скидки</option>
        </select>
      </div>

      <div className={styles.control}>
        <label className={styles.label}>Направление</label>
        <select
          className={styles.select}
          value={order}
          onChange={handleOrderChange}
          disabled={!sortBy}
        >
          <option value="asc">По возрастанию (A-Z, 0-9)</option>
          <option value="desc">По убыванию (Z-A, 9-0)</option>
        </select>
      </div>
    </div>
  );
};
