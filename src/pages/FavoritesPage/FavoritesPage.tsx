import { useAppSelector } from "../../app/hooks";
import { selectFavoriteIds } from "../../features/favorites/selectors";
import { useGetProductByIdQuery } from "../../api/productsApi";
import { ProductCard } from "../../components/product/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import styles from "./FavoritesPage.module.scss";

const FavoriteItem = ({ id }: { id: number }) => {
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) return <div className={styles.loader}>Загрузка...</div>;
  if (isError || !product)
    return <div className={styles.error}>Ошибка загрузки</div>;

  return <ProductCard product={product} />;
};

export const FavoritesPage = () => {
  const favoriteIds = useAppSelector(selectFavoriteIds);

  if (favoriteIds.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>В избранном пока пусто</h2>
        <p>Добавляйте товары, нажимая на сердечко в каталоге.</p>
        <Link to="/" className={styles.backLink}>
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Избранное</h1>
      <div className={styles.grid}>
        {favoriteIds.map((id) => (
          <FavoriteItem key={id} id={id} />
        ))}
      </div>
    </div>
  );
};
