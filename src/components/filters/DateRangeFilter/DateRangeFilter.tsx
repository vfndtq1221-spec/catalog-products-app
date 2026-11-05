import styles from "./DateRangeFilter.module.scss";

interface DateRangeFilterProps {
  modifiedAfter: string;
  modifiedBefore: string;
  onChange: (after: string, before: string) => void;
}

export const DateRangeFilter = ({
  modifiedAfter,
  modifiedBefore,
  onChange,
}: DateRangeFilterProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.control}>
        <label className={styles.label}>Изменено после</label>
        <input
          type="date"
          className={styles.input}
          value={modifiedAfter}
          onChange={(e) => onChange(e.target.value, modifiedBefore)}
        />
      </div>

      <div className={styles.control}>
        <label className={styles.label}>Изменено до</label>
        <input
          type="date"
          className={styles.input}
          value={modifiedBefore}
          onChange={(e) => onChange(modifiedAfter, e.target.value)}
        />
      </div>

      {(modifiedAfter || modifiedBefore) && (
        <button
          className={styles.clearBtn}
          onClick={() => onChange("", "")}
          type="button"
        >
          Очистить даты
        </button>
      )}
    </div>
  );
};
