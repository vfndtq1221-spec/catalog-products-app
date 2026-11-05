import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  ids: number[];
}

// Пытаемся достать избранное из localStorage (пункт 10 "Доп. преимущества")
// Если там пусто, начинаем с пустого массива
const loadFavorites = (): number[] => {
  try {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = {
  ids: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.ids.indexOf(id);

      if (index >= 0) {
        state.ids.splice(index, 1);
      } else {
        state.ids.push(id);
      }

      localStorage.setItem("favorites", JSON.stringify(state.ids));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
