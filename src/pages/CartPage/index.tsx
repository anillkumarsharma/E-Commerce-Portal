import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useCart } from '../../context/CartContext'
import useWindowSize from '../../hooks/useWindowSize'

// LOGIC: observer() - cart state changes pe yeh page re-render ho
const CartPage = observer(() => {
  const cart = useCart()
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const isMobile = width < 640

  // LOGIC: Track which item is being removed (animation ke liye)
  const [removingId, setRemovingId] = useState<number | null>(null)

  // LOGIC: Remove item handler with animation
  const handleRemove = (productId: number) => {
    // LOGIC: aapko yahan apni logic likhni hai
    setRemovingId(productId)
    // LOGIC: Animation ke liye 300ms wait karo phir remove karo
    setTimeout(() => {
      cart.removeItem(productId)
      setRemovingId(null)
    }, 300)
  }

  // ── Empty Cart ──────────────────────────────────────────────────────────
  if (cart.items.length === 0) {
    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          textAlign: 'center',
          padding: isMobile ? '40px 24px' : '64px 48px',
          backgroundColor: '#fff',
          borderRadius: '24px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          maxWidth: '420px',
          width: '90%',
        }}>
          <div style={{
            width: '96px', height: '96px',
            background: 'linear-gradient(135deg, #eef2ff, #f5f3ff)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '44px', margin: '0 auto 24px',
            border: '2px solid #c7d2fe',
            boxShadow: '0 4px 20px rgba(79,70,229,0.15)',
          }}>🛒</div>
          <h2 style={{ margin: '0 0 12px 0', fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>
            Your cart is empty
          </h2>
          <p style={{ margin: '0 0 32px 0', color: '#64748b', fontSize: '15px', lineHeight: 1.7 }}>
            Looks like you haven't added anything yet.<br />Start exploring our products!
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '14px 36px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              color: '#fff', border: 'none', borderRadius: '14px',
              fontSize: '15px', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(79,70,229,0.35)',
              transition: 'transform 0.15s ease',
            }}
          >
            Browse Products →
          </button>
        </div>
      </div>
    )
  }

  // ── Cart with Items ─────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: '#f4f6fb', minHeight: 'calc(100vh - 140px)' }}>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideOut { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(60px); } }
        .qty-btn:hover { background: linear-gradient(135deg,#4f46e5,#7c3aed) !important; color: white !important; border-color: #4f46e5 !important; }
        .remove-btn:hover { background-color: #fef2f2 !important; transform: scale(1.1); }
        .cart-item-card:hover { border-color: #c7d2fe !important; box-shadow: 0 6px 24px rgba(79,70,229,0.1) !important; }
        .checkout-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(79,70,229,0.45) !important; }
      `}</style>

      {/* Page Header — full width gradient */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #a855f7 100%)',
        padding: isMobile ? '28px 16px 36px' : '36px 32px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '5%', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <h1 style={{
          margin: '0 0 6px 0',
          fontSize: isMobile ? '24px' : '30px',
          fontWeight: '800', color: '#fff', letterSpacing: '-0.5px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          🛒 Your Cart
        </h1>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>
          {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''} · Free shipping on all orders
        </p>
      </div>

      <main style={{
        width: '100%',
        padding: isMobile ? '16px' : '28px 32px',
        boxSizing: 'border-box',
        marginTop: isMobile ? '-16px' : '-24px',
        animation: 'fadeInUp 0.35s ease',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '20px',
          alignItems: 'flex-start',
        }}>

          {/* ── Cart Items List ─────────────────────────────────── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="cart-item-card"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  padding: isMobile ? '14px' : '18px',
                  marginBottom: '12px',
                  border: '1.5px solid #e8edf5',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  animation: removingId === item.id ? 'slideOut 0.3s ease forwards' : 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* Product Image */}
                <div
                  onClick={() => navigate(`/product/${item.id}/details`)}
                  style={{
                    width: isMobile ? '72px' : '92px',
                    height: isMobile ? '72px' : '92px',
                    background: 'linear-gradient(145deg, #f8fafc, #eef2ff)',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, cursor: 'pointer', padding: '8px',
                    border: '1px solid #e2e8f0',
                    transition: 'transform 0.18s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <img
                    src={item.image} alt={item.title}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>

                {/* Product Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Category pill */}
                  <span style={{
                    display: 'inline-block',
                    fontSize: '10px', fontWeight: '700',
                    color: '#4f46e5', backgroundColor: '#eef2ff',
                    padding: '2px 9px', borderRadius: '20px',
                    textTransform: 'capitalize', border: '1px solid #c7d2fe',
                    marginBottom: '5px',
                  }}>
                    {item.category}
                  </span>

                  <h3 style={{
                    margin: '0 0 10px 0',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '700', color: '#0f172a',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {item.title}
                  </h3>

                  {/* Price + Qty row */}
                  <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    gap: isMobile ? '10px' : '16px',
                  }}>
                    <span style={{ fontSize: '17px', fontWeight: '800', color: '#059669' }}>
                      ₹{Math.round(item.price * 84).toLocaleString('en-IN')}
                    </span>

                    {/* Pill-style qty control */}
                    <div style={{
                      display: 'flex', alignItems: 'center',
                      backgroundColor: '#f8fafc',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '40px',
                      overflow: 'hidden',
                    }}>
                      <button
                        className="qty-btn"
                        onClick={() => cart.decreaseQuantity(item.id)}
                        style={{
                          width: '34px', height: '34px',
                          backgroundColor: 'transparent', border: 'none',
                          fontSize: '18px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#475569', fontWeight: '700',
                          transition: 'all 0.15s ease', flexShrink: 0,
                        }}
                      >−</button>
                      <span style={{
                        fontSize: '14px', fontWeight: '800', color: '#0f172a',
                        minWidth: '28px', textAlign: 'center',
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        className="qty-btn"
                        onClick={() => cart.increaseQuantity(item.id)}
                        style={{
                          width: '34px', height: '34px',
                          backgroundColor: 'transparent', border: 'none',
                          fontSize: '18px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#475569', fontWeight: '700',
                          transition: 'all 0.15s ease', flexShrink: 0,
                        }}
                      >+</button>
                    </div>

                    {item.quantity > 1 && (
                      <span style={{
                        fontSize: '13px', color: '#64748b', fontWeight: '600',
                        backgroundColor: '#f1f5f9', padding: '3px 10px', borderRadius: '20px',
                      }}>
                        = ₹{Math.round(item.price * item.quantity * 84).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Remove button */}
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                  title="Remove item"
                  style={{
                    width: '36px', height: '36px',
                    backgroundColor: '#fff5f5', color: '#ef4444',
                    border: '1.5px solid #fecaca', borderRadius: '10px',
                    fontSize: '16px', cursor: 'pointer', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>

          {/* ── Order Summary ───────────────────────────────────── */}
          <div style={{
            width: isMobile ? '100%' : '300px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            border: '1.5px solid #e2e8f0',
            flexShrink: 0,
            position: isMobile ? 'static' : 'sticky',
            top: '80px',
            backgroundColor: '#fff',
          }}>
            {/* Summary Header */}
            <div style={{
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              padding: '20px 24px',
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#fff', letterSpacing: '-0.3px' }}>
                Order Summary
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''} in your cart
              </p>
            </div>

            <div style={{ padding: '20px 24px' }}>
              {/* Line items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: '600', color: '#1e293b' }}>₹{Math.round(cart.totalPrice * 84).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}>
                  <span>Shipping</span>
                  <span style={{
                    fontWeight: '700', color: '#059669',
                    backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '20px', fontSize: '12px',
                  }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}>
                  <span>Tax (5%)</span>
                  <span style={{ fontWeight: '600', color: '#1e293b' }}>₹{Math.round(cart.totalPrice * 84 * 0.05).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '2px dashed #e2e8f0', marginBottom: '16px' }} />

              {/* Total */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '20px',
              }}>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Total</span>
                <span style={{ fontSize: '22px', fontWeight: '900', color: '#4f46e5' }}>
                  ₹{Math.round(cart.totalPrice * 84 * 1.05).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Free shipping badge */}
              <div style={{
                backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
                borderRadius: '10px', padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '16px',
              }}>
                <span style={{ fontSize: '16px' }}>🚚</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#15803d' }}>
                  You qualify for FREE shipping!
                </span>
              </div>

              <button
                className="checkout-btn"
                style={{
                  width: '100%', padding: '15px',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  color: '#fff', border: 'none', borderRadius: '14px',
                  fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(79,70,229,0.35)',
                  marginBottom: '10px',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em',
                }}
              >
                Proceed to Checkout →
              </button>

              <button
                onClick={() => navigate('/')}
                style={{
                  width: '100%', padding: '12px',
                  backgroundColor: 'transparent',
                  color: '#4f46e5', border: '1.5px solid #c7d2fe',
                  borderRadius: '14px', fontSize: '14px', fontWeight: '600',
                  cursor: 'pointer', transition: 'background-color 0.15s ease',
                }}
              >
                ← Continue Shopping
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
})

export default CartPage
