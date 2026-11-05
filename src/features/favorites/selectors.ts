import type { RootState } from "../../app/store";

export const selectFavoriteIds = (state: RootState) => state.favorites.ids;

export const selectFavoritesCount = (state: RootState) =>
  state.favorites.ids.length;

export const selectIsFavorite = (id: number) => (state: RootState) =>
  state.favorites.ids.includes(id);
