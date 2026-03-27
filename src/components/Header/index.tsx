import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from '../../styles/Header.module.css'

const Header = () => {
  const cart = useCart()
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logoIcon}>🛍</div>
          <span className={styles.brandName}>ApnaBazaar</span>
        </Link>
        <nav className={styles.nav}>
          <Link
            to="/"
            className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className={`${styles.cartLink} ${isActive('/cart') ? styles.cartLinkActive : ''}`}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Cart
            {cart.items.length > 0 && (
              <span className={styles.cartBadge}>
                {cart.items.length > 99 ? '99+' : cart.items.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
