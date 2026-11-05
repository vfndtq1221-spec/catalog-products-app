import { Link } from "react-router-dom";
import { Routing } from "./router/routes";
import { useAppSelector } from "./app/hooks";
import { selectFavoritesCount } from "./features/favorites/selectors";
import styles from './App.module.scss';

function App() {
  const favoritesCount = useAppSelector(selectFavoritesCount);

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.title}>
          Каталог товаров
        </Link>
        
        <nav className={styles.nav}>
          <Link to="/favorites" className={styles.link}>
            Избранное{" "}
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </Link>
        </nav>
      </header>
      
      <main className={styles.main}>
        <Routing />
      </main>
    </>
  );
}

export default App;