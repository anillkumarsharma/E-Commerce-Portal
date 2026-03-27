# ShopZone - E-Commerce Web Application

**GitHub Repository:** [anillkumarsharma/E-Commerce-Portal](https://github.com/anillkumarsharma/E-Commerce-Portal)

A React-based e-commerce app built for the Sembark Tech frontend assignment.

## Tech Stack

- **React 19** with TypeScript (Vite)
- **React Router v7** - navigation & URL-based filter persistence
- **React Context API + useState** - cart state management (with localStorage persistence)
- **CSS Modules** - component-scoped styling
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
    CartPage/       - Cart items with quantity controls & remove
  context/
    CartContext.tsx - React Context + useState cart management
  api/
    productApi.ts   - All fakestoreapi.com API calls
  hooks/
    useWindowSize.ts - Responsive inline styles helper
  styles/
    *.module.css    - CSS Modules for each component/page
  types/
    index.ts        - TypeScript interfaces (Product, CartItem, SortOrder)
```

## Features

- Product listing grid (responsive, CSS Modules)
- Multi-category filter + price sort — **URL-persisted** (survives page refresh & back button)
- Product detail page at `/product/:id/details`
- Add to Cart with animation
- Increase / decrease quantity and remove from Cart
- Cart total and item count visible in header & footer
- **localStorage cart persistence** — cart survives page reload
- Page entry animations

## Cart Functionality

Cart is managed via React Context API with `useState`:

- `addItem` — adds product or increments quantity if already present
- `removeItem` — removes product entirely
- `increaseQuantity` / `decreaseQuantity` — quantity controls (auto-removes at 0)
- `clearCart` — empties the cart
- `isInCart` — checks if a product is already in cart
- `totalItems` / `totalPrice` — derived values available globally

All cart changes are synced to `localStorage` automatically.

## Known Limitations & Assumptions

1. **`got` library**: The assignment requires `got` for HTTP requests. `got` is a Node.js-only library and **cannot run in browser environments**. `axios` is used as a fully equivalent browser-compatible alternative.

2. **CRA vs Vite**: The assignment mentions CRA (Create React App). This project uses **Vite** which is the modern standard (CRA is deprecated). All functionality is identical.

3. **Multiple category filtering**: `fakestoreapi.com` only supports single-category filtering per API call. For multiple categories, parallel API calls are made and results are merged.

4. **`useSearchParams` not used**: URL filter persistence is implemented manually using `new URLSearchParams(location.search)` (browser built-in API) + `useNavigate` from React Router — as required by the assignment.
