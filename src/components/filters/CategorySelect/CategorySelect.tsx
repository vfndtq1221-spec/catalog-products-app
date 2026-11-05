import { useGetCategoriesQuery } from "../../../api/productsApi";
import styles from "./CategorySelect.module.scss";

interface CategorySelectProps {
  value: string;
  onChange: (category: string) => void;
}

export const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading)
    return <div className={styles.loading}>Загрузка категорий...</div>;
  if (isError)
    return <div className={styles.error}>Ошибка загрузки категорий</div>;

  return (
    <div className={styles.container}>
      <label htmlFor="category-select" className={styles.label}>
        Категория
      </label>
      <select
        id="category-select"
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Все категории</option>
        {categories?.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() +
              category.slice(1).replace(/-/g, " ")}
          </option>
        ))}
      </select>
    </div>
  );
};
