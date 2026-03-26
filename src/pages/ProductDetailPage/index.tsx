import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import type { Product } from '../../types'
import { fetchProductById } from '../../api/productApi'
import { useCart } from '../../context/CartContext'
import Loader from '../../components/Loader'
import useWindowSize from '../../hooks/useWindowSize'

// LOGIC: observer() wrap - MobX cart state changes pe re-render karna zaroori hai
const ProductDetailPage = observer(() => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const cart = useCart()
  const { width } = useWindowSize()
  const isMobile = width < 640

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // LOGIC: Animation state - "Add to Cart" click ke baad button ka state
  const [addedAnimation, setAddedAnimation] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // LOGIC: URL se product id lo aur API se product fetch karo
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return

      setLoading(true)
      setError(null)
      try {
        // LOGIC: aapko yahan apni logic likhni hai
        const data = await fetchProductById(Number(id))
        setProduct(data)
      } catch {
        setError('Product not found or failed to load.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  // LOGIC: Add to cart handler with animation
  const handleAddToCart = () => {
    if (!product || isInCart) return

    cart.addItem(product)

    // LOGIC: Button animation - 1.5 seconds ke liye "Added!" dikhao
    setAddedAnimation(true)
    setTimeout(() => setAddedAnimation(false), 1500)

    // Toast notification
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // LOGIC: Check whether this product is already in cart (for button label)
  const isInCart = product ? cart.isInCart(product.id) : false

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) return <Loader />

  // ── Error ────────────────────────────────────────────────────────────────
  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ color: '#dc2626', fontSize: '18px' }}>{error || 'Product not found'}</p>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '16px',
            padding: '10px 24px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Back to Products
        </button>
      </div>
    )
  }

  // ── Main Render ──────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 140px)' }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(-20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes toastOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(-20px) scale(0.95); } }
      `}</style>

      {/* ── Success Toast ── */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          backgroundColor: '#fff',
          borderRadius: '14px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          border: '1.5px solid #bbf7d0',
          animation: 'toastIn 0.3s ease',
          minWidth: isMobile ? '280px' : '320px',
          maxWidth: '90vw',
        }}>
          <div style={{
            width: '36px', height: '36px', flexShrink: 0,
            background: 'linear-gradient(135deg, #059669, #10b981)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
          }}>✓</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>
              Added to Cart!
            </p>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px',
            }}>
              {product?.title}
            </p>
          </div>
          <button
            onClick={() => navigate('/cart')}
            style={{
              padding: '6px 14px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              color: '#fff', border: 'none', borderRadius: '8px',
              fontSize: '12px', fontWeight: '700', cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            View Cart
          </button>
        </div>
      )}

      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: isMobile ? '16px' : '32px 24px',
          animation: 'fadeIn 0.35s ease',
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '24px',
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '9px 18px',
            cursor: 'pointer',
            color: '#4b5563',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.15s ease',
          }}
        >
          ← Back to Products
        </button>

        {/* Product Detail Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0' : '0',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            border: '1px solid #e2e8f0',
          }}
        >
          {/* Product Image Panel */}
          <div
            style={{
              flex: isMobile ? 'unset' : '0 0 420px',
              background: 'linear-gradient(145deg, #f8fafc 0%, #eef2ff 100%)',
              padding: isMobile ? '32px 24px' : '48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: isMobile ? '260px' : '420px',
              gap: '20px',
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: '100%',
                maxHeight: isMobile ? '200px' : '300px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.1))',
                animation: 'popIn 0.4s ease',
              }}
            />
            {/* Rating below image */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255,255,255,0.8)',
              padding: '8px 16px',
              borderRadius: '20px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.9)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <span style={{ color: '#f59e0b', fontSize: '15px', letterSpacing: '1px' }}>
                {'★'.repeat(Math.round(product.rating.rate))}{'☆'.repeat(5 - Math.round(product.rating.rate))}
              </span>
              <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '500' }}>
                {product.rating.rate} · {product.rating.count} reviews
              </span>
            </div>
          </div>

          {/* Product Info Panel */}
          <div style={{
            flex: 1,
            padding: isMobile ? '24px' : '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            borderLeft: isMobile ? 'none' : '1px solid #f1f5f9',
            borderTop: isMobile ? '1px solid #f1f5f9' : 'none',
          }}>
            {/* Category badge */}
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#4f46e5',
              backgroundColor: '#eef2ff',
              padding: '5px 14px',
              borderRadius: '20px',
              alignSelf: 'flex-start',
              textTransform: 'capitalize',
              border: '1px solid #c7d2fe',
              letterSpacing: '0.03em',
            }}>
              {product.category}
            </span>

            {/* Title */}
            <h1 style={{
              margin: 0,
              fontSize: isMobile ? '20px' : '26px',
              fontWeight: '800',
              color: '#0f172a',
              lineHeight: '1.3',
            }}>
              {product.title}
            </h1>

            {/* Price */}
            <div style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
              borderRadius: '12px',
              border: '1px solid #bbf7d0',
              alignSelf: 'flex-start',
            }}>
              <p style={{ margin: '0 0 2px 0', fontSize: '11px', fontWeight: '600', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Price
              </p>
              <p style={{ margin: 0, fontSize: isMobile ? '28px' : '36px', fontWeight: '900', color: '#15803d', lineHeight: 1 }}>
                ₹{Math.round(product.price * 84).toLocaleString('en-IN')}
              </p>
            </div>

            {/* Description */}
            <div>
              <p style={{
                margin: '0 0 10px 0',
                fontSize: '11px',
                fontWeight: '700',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                Description
              </p>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#475569',
                lineHeight: '1.75',
              }}>
                {product.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {isInCart ? (
                <button
                  onClick={() => navigate('/cart')}
                  style={{
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    width: isMobile ? '100%' : 'auto',
                    boxShadow: '0 4px 14px rgba(5,150,105,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  🛒 Go to Cart
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  style={{
                    padding: '14px 32px',
                    background: addedAnimation
                      ? 'linear-gradient(135deg, #059669, #10b981)'
                      : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transform: addedAnimation ? 'scale(0.97)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    width: isMobile ? '100%' : 'auto',
                    boxShadow: addedAnimation
                      ? '0 4px 14px rgba(5,150,105,0.35)'
                      : '0 4px 14px rgba(79,70,229,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  {addedAnimation ? '✓ Added to Cart!' : '🛍 Add to Cart'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
})

export default ProductDetailPage
