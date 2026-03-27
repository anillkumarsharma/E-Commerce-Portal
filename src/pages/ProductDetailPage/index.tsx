import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Product } from '../../types'
import { fetchProductById } from '../../api/productApi'
import { useCart } from '../../context/CartContext'
import Loader from '../../components/Loader'
import styles from '../../styles/ProductDetailPage.module.css'


const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const cart = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addedAnimation, setAddedAnimation] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
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

  const handleAddToCart = () => {
    if (!product || isInCart) return
    cart.addItem(product)
    setAddedAnimation(true)
    setTimeout(() => setAddedAnimation(false), 1500)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const isInCart = product ? cart.isInCart(product.id) : false

  
  if (loading) return <Loader />

  if (error || !product) {
    return (
      <div className={styles.errorState}>
        <p className={styles.errorMsg}>{error || 'Product not found'}</p>
        <button onClick={() => navigate('/')} className={styles.errorBackBtn}>
          Back to Products
        </button>
      </div>
    )
  }
  return (
    <div className={styles.page}>

      {showToast && (
        <div className={styles.toast}>
          <div className={styles.toastIcon}>✓</div>
          <div className={styles.toastInfo}>
            <p className={styles.toastTitle}>Added to Cart!</p>
            <p className={styles.toastProduct}>{product?.title}</p>
          </div>
          <button onClick={() => navigate('/cart')} className={styles.viewCartBtn}>
            View Cart
          </button>
        </div>
      )}

      <main className={styles.main}>
     
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ← Back to Products
        </button>

    
        <div className={styles.detailCard}>
        
          <div className={styles.imagePanel}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
          
            <div className={styles.ratingPill}>
              <span className={styles.stars}>
                {'★'.repeat(Math.round(product.rating.rate))}{'☆'.repeat(5 - Math.round(product.rating.rate))}
              </span>
              <span className={styles.ratingText}>
                {product.rating.rate} · {product.rating.count} reviews
              </span>
            </div>
          </div>

          <div className={styles.infoPanel}>
            <span className={styles.categoryBadge}>{product.category}</span>

            <h1 className={styles.title}>{product.title}</h1>

       
            <div className={styles.priceBox}>
              <p className={styles.priceLabel}>Price</p>
              <p className={styles.priceValue}>
                ₹{Math.round(product.price * 84).toLocaleString('en-IN')}
              </p>
            </div>

          
            <div>
              <p className={styles.descLabel}>Description</p>
              <p className={styles.descText}>{product.description}</p>
            </div>

          
            <div className={styles.ctaButtons}>
              {isInCart ? (
                <button onClick={() => navigate('/cart')} className={styles.goToCartBtn}>
                  🛒 Go to Cart
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className={`${styles.addToCartBtn} ${addedAnimation ? styles.addToCartBtnAdded : ''}`}
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
}

export default ProductDetailPage
