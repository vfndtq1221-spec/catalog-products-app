import { Link, useLocation } from "react-router-dom";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import styles from "./ProductCard.module.scss";
import type { Product } from "../../../api/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const location = useLocation();

  return (
    <div className={styles.card}>
      <Link
        to={`/products/${product.id}`}
        state={{ from: location.search }}
        className={styles.link}
      >
        <div className={styles.imageWrapper}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.category}>{product.category}</p>
        </div>
      </Link>

      <div className={styles.favoriteWrapper}>
        <FavoriteButton productId={product.id} />
      </div>
    </div>
  );
};
