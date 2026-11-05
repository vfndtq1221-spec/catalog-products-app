import { useEffect, useRef } from "react";
import styles from "./InfiniteScrollTrigger.module.scss";

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
}

export const InfiniteScrollTrigger = ({
  onIntersect,
  isLoading,
  hasNextPage,
}: InfiniteScrollTriggerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 1.0 },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onIntersect, isLoading, hasNextPage]);

  return (
    <div ref={ref} className={styles.trigger} aria-live="polite">
      {isLoading && (
        <div className={styles.loading} role="status">
          <span className={styles.spinner} aria-hidden="true" />
          Загружаем товары...
        </div>
      )}
      {!isLoading && !hasNextPage && (
        <div className={styles.endMessage}>Вы просмотрели все товары</div>
      )}
    </div>
  );
};
