import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { toggleFavorite } from "../../../features/favorites/favoritesSlice";
import { selectIsFavorite } from "../../../features/favorites/selectors";
import styles from "./FavoriteButton.module.scss";

interface FavoriteButtonProps {
  productId: number;
}

export const FavoriteButton = ({ productId }: FavoriteButtonProps) => {
  const dispatch = useAppDispatch();

  const isFavorite = useAppSelector(selectIsFavorite(productId));

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(productId));
  };

  return (
    <button
      className={`${styles.btn} ${isFavorite ? styles.active : ""}`}
      onClick={handleClick}
      aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      aria-pressed={isFavorite}
      type="button"
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
};
