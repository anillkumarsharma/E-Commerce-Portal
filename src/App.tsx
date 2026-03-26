import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'

// LOGIC: App structure -
// BrowserRouter → React Router ko URL changes track karne deta hai
// CartProvider  → MobX cart store ko poore app mein available karta hai
// Header / Footer → Sab pages pe common rahenge
// Routes → Konsa component konse URL pe render ho

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: '#f1f5f9',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* LOGIC: Header is always visible on all pages */}
          <Header />

          {/* LOGIC: Routes - URL ke hisaab se page render hoga */}
          <Routes>
            {/* Home Page - product listing with filters */}
            <Route path="/" element={<HomePage />} />

            {/* Product Detail Page - dynamic route by :id */}
            <Route path="/product/:id/details" element={<ProductDetailPage />} />

            {/* Cart Page */}
            <Route path="/cart" element={<CartPage />} />

            {/* LOGIC: 404 fallback - koi bhi unknown route home pe bhejo */}
            <Route path="*" element={<HomePage />} />
          </Routes>

          {/* LOGIC: Footer is always visible - cart summary dikhata hai */}
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
