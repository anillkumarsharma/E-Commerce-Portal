# ShopZone - E-Commerce Web Application

A React-based e-commerce app built for the Sembark Tech frontend assignment.

## Tech Stack

- **React 19** with TypeScript (Vite)
- **React Router v6** - navigation & URL-based filter persistence
- **MobX + React Context API** - cart state management
- **Axios** - API calls to [fakestoreapi.com](https://fakestoreapi.com)
- **Cypress** - E2E testing

## Setup & Run

### Prerequisites
- Node.js v18+
- npm v9+

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Build for production

```bash
npm run build
```

### Run E2E tests (Cypress)

Make sure dev server is running first:

```bash
# Terminal 1
npm run dev

# Terminal 2 - opens Cypress interactive UI
npx cypress open

# OR run headless
npx cypress run
```

## Project Structure

```
src/
  components/
    Header/         - Navigation bar with cart badge
    Footer/         - Cart summary (total items + total price)
    ProductCard/    - Individual product card with hover animation
    CategoryFilter/ - Multi-select category filter + sort dropdown
    Loader/         - Loading spinner
  pages/
    HomePage/       - Product listing with URL-persisted filters
    ProductDetailPage/ - Product detail with Add to Cart
    CartPage/       - Cart items with remove functionality
  context/
    CartContext.tsx - React Context wrapping MobX store
  store/
    cartStore.ts    - MobX observable cart store
  api/
    productApi.ts   - All fakestoreapi.com API calls
  hooks/
    useWindowSize.ts - Responsive inline styles helper
  types/
    index.ts        - TypeScript interfaces
```

## Features

- Product listing grid (responsive, inline styles)
- Multi-category filter + price sort — **URL-persisted** (survives page refresh & back button)
- Product detail page at `/product/:id/details`
- Add to Cart with animation
- Remove from Cart
- Cart total and item count in footer (always visible)
- localStorage cart persistence (bonus)
- Page entry animations

## Known Limitations & Assumptions

1. **`got` library**: The assignment requires `got` for HTTP requests. `got` is a Node.js-only library and **cannot run in browser environments**. `axios` is used as a fully equivalent browser-compatible alternative.

2. **CRA vs Vite**: The assignment mentions CRA (Create React App). This project uses **Vite** which is the modern standard (CRA is deprecated). All functionality is identical.

3. **Multiple category filtering**: `fakestoreapi.com` only supports single-category filtering per API call. For multiple categories, parallel API calls are made and results are merged.

4. **`useSearchParams` not used**: URL filter persistence is implemented manually using `new URLSearchParams(location.search)` (browser built-in API) + `useNavigate` from React Router — as required by the assignment.
