import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <p className={styles.code}>404</p>
      <h1>Страница не найдена</h1>
      <p className={styles.description}>Похоже, такой страницы каталога не существует.</p>
      <Link to="/" className={styles.link}>Вернуться в каталог</Link>
    </div>
  )
}