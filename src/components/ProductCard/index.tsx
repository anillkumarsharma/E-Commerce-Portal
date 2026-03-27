import { useNavigate } from 'react-router-dom'
import type { Product } from '../../types'
import useWindowSize from '../../hooks/useWindowSize'
import styles from '../../styles/ProductCard.module.css'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate()
  const { width } = useWindowSize()

  // Calculate card width based on screen size.

  const getCardWidth = (): string => {
    if (width < 480) return '100%'
    if (width < 768) return 'calc(50% - 12px)'
    if (width < 1024) return 'calc(33.33% - 16px)'
    return 'calc(25% - 18px)'
  }
  const handleClick = () => {
    navigate(`/product/${product.id}/details`)
  }

  const stars = Math.round(product.rating.rate)

  return (
    <article
      onClick={handleClick}
      className={styles.card}
      style={{ width: getCardWidth() }}
    >
      <div className={styles.imageContainer}>
        <span className={styles.categoryBadge}>{product.category}</span>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productImage}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.ratingRow}>
          <span className={styles.stars}>
            {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
          </span>
          <span className={styles.ratingCount}>({product.rating.count})</span>
        </div>
        <p className={styles.price}>
          ₹{Math.round(product.price * 84).toLocaleString('en-IN')}
        </p>
      </div>
      <div className={styles.viewBtnWrapper}>
        <button className={styles.viewBtn}>
          View Details
          <span className={styles.arrow}>→</span>
        </button>
      </div>
    </article>
  )
}

export default ProductCard
