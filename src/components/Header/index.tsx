import { Link, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useCart } from '../../context/CartContext'
import useWindowSize from '../../hooks/useWindowSize'

// LOGIC: observer() wrap karna zaroori hai taaki MobX changes pe re-render ho
const Header = observer(() => {
  const cart = useCart()
  const location = useLocation()
  const { width } = useWindowSize()
  const isMobile = width < 640

  // LOGIC: Active link highlight karne ke liye current path check karo
  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <style>{`
        .nav-link { transition: all 0.18s ease; }
        .nav-link:hover { background-color: #f1f5f9 !important; color: #4f46e5 !important; }
        .cart-link:hover { background-color: #eef2ff !important; color: #4f46e5 !important; }
      `}</style>
      <header
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            width: '100%',
            padding: isMobile ? '12px 16px' : '0 32px',
            height: isMobile ? 'auto' : '64px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          {/* Brand Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
            }}>
              🛍
            </div>
            <span style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.5px',
            }}>
              ApnaBazaar
            </span>
          </Link>

          {/* Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '2px' : '4px' }}>
            <Link
              to="/"
              className="nav-link"
              style={{
                textDecoration: 'none',
                padding: isMobile ? '8px 12px' : '8px 16px',
                borderRadius: '8px',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: isActive('/') ? '600' : '500',
                color: isActive('/') ? '#4f46e5' : '#4b5563',
                backgroundColor: isActive('/') ? '#eef2ff' : 'transparent',
                whiteSpace: 'nowrap',
              }}
            >
              Products
            </Link>

            {/* Cart link with badge */}
            <Link
              to="/cart"
              className="cart-link"
              style={{
                textDecoration: 'none',
                position: 'relative',
                padding: isMobile ? '8px 12px' : '8px 16px',
                borderRadius: '8px',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: isActive('/cart') ? '600' : '500',
                color: isActive('/cart') ? '#4f46e5' : '#4b5563',
                backgroundColor: isActive('/cart') ? '#eef2ff' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Cart
              {/* LOGIC: Badge - sirf tab dikhao jab cart mein items hon */}
              {cart.items.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '11px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 0 2px white',
                    lineHeight: 1,
                  }}
                >
                  {cart.items.length > 99 ? '99+' : cart.items.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
})

export default Header
