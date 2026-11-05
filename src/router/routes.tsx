import { Route, Routes } from "react-router-dom"
import { CatalogPage } from "../pages/CatalogPage/CatalogPage"
import { FavoritesPage } from "../pages/FavoritesPage/FavoritesPage"
import { ProductPage } from "../pages/ProductPage/ProductPage"
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage"

export const Path = {
  Catalog: '/',
  Favorites: '/favorites',
  Product: '/products/:id',
  NotFound: '*',
} as const
 
export const Routing = () => (
  <Routes>
    <Route path={Path.Catalog} element={< CatalogPage/>} />
    <Route path={Path.Favorites} element={< FavoritesPage/>} />
    <Route path={Path.Product} element={< ProductPage/>} />
    <Route path={Path.NotFound} element={< NotFoundPage/>} />
  </Routes>
)