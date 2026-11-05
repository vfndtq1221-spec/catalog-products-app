import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SearchInput.module.scss";
import { useFilters } from "../../../features/filters/userFilters";

export const SearchInput = () => {
  const { filters, setFilters } = useFilters();
  const location = useLocation();
  const navigate = useNavigate();

  const value = filters.q;
  const [inputValue, setInputValue] = useState(value);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charCountRef = useRef(0);
  const prevLengthRef = useRef(value.length);

  const updateSearch = (val: string) => {
    setFilters({ q: val });
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  useEffect(() => {
    setInputValue(value);
    prevLengthRef.current = value.length;
    charCountRef.current = 0;
  }, [value]);

  useEffect(() => {
    if (inputValue === value) return;

    if (inputValue === "") {
      updateSearch("");
      charCountRef.current = 0;
      prevLengthRef.current = 0;
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const diff = inputValue.length - prevLengthRef.current;
    prevLengthRef.current = inputValue.length;

    if (diff > 0) {
      charCountRef.current += diff;
      if (charCountRef.current >= 4) {
        updateSearch(inputValue);
        charCountRef.current = 0;
        if (timerRef.current) clearTimeout(timerRef.current);
        return;
      }
    } else {
      charCountRef.current = 0;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      updateSearch(inputValue);
      charCountRef.current = 0;
    }, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inputValue, value]);

  const handleClear = () => {
    setInputValue("");
    updateSearch("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Поиск товаров..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <button
            className={styles.clearBtn}
            onClick={handleClear}
            type="button"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
