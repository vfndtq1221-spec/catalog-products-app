# Каталог товаров
Проект по созданию базовой страницы интернет-магазина для просмотра, поиска и добавление товаров в "Избранное".

## Технологии
*   **React 18 + Vite** 
*   **TypeScript** 
*   **Redux Toolkit + RTK Query** 
*   **React Router v6** 
*   **SCSS Modules** 
*   **API**
    - Базовый URL: https://dummyjson.com/products
    - Официальная документация: https://dummyjson.com/docs/products




## 🚀 Инструкция по установке и запуску
Убедитесь, что у вас установлен Node.js (рекомендуется версия 18 или выше) и пакетный менеджер `npm` или `pnpm`.

### Клонирование репозитория с GitHub
Необходимо скопировать URL репозитория и в терминале выполнить команду:
```sh
git clone https://github.com/vfndtq1221-spec/catalog-product-app
cd catalog-products-app
```
### Установите зависимости
Для установки зависимости выполните следующую команду:
```sh
pnpm install
```
### Запуск Development сервера
Чтобы запустить сервер для разработки, выполните команду:
```sh
pnpm run dev
```
### Важное примечание по работе с API
Для обеспечения стабильного подключения к API рекомендуется использовать VPN.

## Архитектура проекта
Проект спроектирован по принципам модульной архитектуры (близкой к Feature-Sliced Design)

```
src/
├── api/          # Настройка RTK Query (createApi), типы запросов и эндпоинты.
├── app/          # Конфигурация Redux store и типизированные хуки (useAppDispatch/useSelector).
├── components/   # UI-компоненты.
│   ├── filters/  # Компоненты фильтрации (SearchInput, CategorySelect, SortControls, DateRangeFilter).
│   ├── product/  # Компоненты товара (ProductCard, FavoriteButton).
│   └── ui/       # Переиспользуемые примитивы (Spinner, InfiniteScrollTrigger).
├── features/     # Бизнес-логика приложения (слайсы, хуки).
│   ├── favorites/# Redux-слайс избранного и селекторы.
│   └── filters/  # Хук useFilters (двусторонняя синхронизация URL) и утилиты.
├── pages/        # Компоненты страниц (CatalogPage, ProductPage, FavoritesPage, NotFoundPage).
├── routes/       # Конфигурация React Router.
├── styles/       # Глобальные переменные SCSS (_vars, _reset)
├── types/        # Глобальные доменные типы (Product, Category и т.д.).
├── App.tsx       # Layout приложения (Header + Routing).
└── main.tsx      # Точка входа (Provider, BrowserRouter, подключение global.scss).
```

