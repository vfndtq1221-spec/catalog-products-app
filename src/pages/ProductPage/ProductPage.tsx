import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../../api/productsApi";
import { FavoriteButton } from "../../components/product/FavoriteButton/FavoriteButton";
import styles from "./ProductPage.module.scss";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const fromSearch = location.state?.from || "";

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(Number(id), {
    skip: !id || isNaN(Number(id)),
  });

  const handleBack = () => {
    navigate(`/${fromSearch}`);
  };

  if (isLoading) return <div className={styles.state}>Загрузка товара...</div>;

  if (isError || !product) {
    return (
      <div className={styles.state}>
        <h2>Товар не найден</h2>
        <p>Возможно, он был удален или ссылка неверна.</p>
        <button onClick={handleBack} className={styles.backBtn}>
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const discount = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0;

  return (
    <div className={styles.page}>
      <button onClick={handleBack} className={styles.backBtn}>
        ← Назад в каталог
      </button>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.mainImage}
          />

          {product.images && product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} ${index}`}
                  className={styles.thumb}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.header}>
            <h1 className={styles.title}>{product.title}</h1>
            <FavoriteButton productId={product.id} />
          </div>

          <div className={styles.rating}>
            Рейтинг: {product.rating ?? "Нет"} ⭐
          </div>

          <div className={styles.priceBlock}>
            <span className={styles.price}>${product.price}</span>
            {discount > 0 && (
              <span className={styles.discount}>-{discount}%</span>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          <ul className={styles.details}>
            <li>
              <strong>Категория:</strong> {product.category}
            </li>
            {product.brand && (
              <li>
                <strong>Бренд:</strong> {product.brand}
              </li>
            )}
            <li>
              <strong>Наличие:</strong>{" "}
              {product.stock ? product.stock : "Нет в наличии"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
