import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../../types'
import useWindowSize from '../../hooks/useWindowSize'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const isMobile = width < 640

  // LOGIC: Hover state for card lift animation
  const [isHovered, setIsHovered] = useState(false)

  // LOGIC: Calculate card width based on screen size (inline responsive)
  const getCardWidth = (): string => {
    if (width < 480) return '100%'
    if (width < 768) return 'calc(50% - 12px)'
    if (width < 1024) return 'calc(33.33% - 16px)'
    return 'calc(25% - 18px)'
  }

  // LOGIC: Card click par detail page pe navigate karo
  const handleClick = () => {
    navigate(`/product/${product.id}/details`)
  }

  const stars = Math.round(product.rating.rate)

  return (
    <article
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: getCardWidth(),
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: isHovered ? '#c7d2fe' : '#f1f5f9',
        boxShadow: isHovered
          ? '0 16px 40px rgba(79,70,229,0.12)'
          : '0 2px 8px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Product image */}
      <div
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)'
            : '#f8fafc',
          padding: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: isMobile ? '160px' : '200px',
          position: 'relative',
          transition: 'background 0.25s ease',
        }}
      >
        {/* Category badge on image */}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontSize: '10px',
          fontWeight: '700',
          color: '#4f46e5',
          backgroundColor: 'rgba(238,242,255,0.95)',
          padding: '3px 9px',
          borderRadius: '20px',
          textTransform: 'capitalize',
          backdropFilter: 'blur(4px)',
          border: '1px solid #c7d2fe',
        }}>
          {product.category}
        </span>
        <img
          src={product.image}
          alt={product.title}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        />
      </div>

      {/* Card content */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Product name */}
        <h3
          style={{
            margin: 0,
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: '600',
            color: '#1e293b',
            lineHeight: '1.45',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ color: '#f59e0b', fontSize: '12px', letterSpacing: '1px' }}>
            {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
          </span>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
            ({product.rating.count})
          </span>
        </div>

        {/* Price */}
        <p style={{ margin: '4px 0 0 0', fontSize: isMobile ? '16px' : '18px', fontWeight: '800', color: '#059669' }}>
          ₹{Math.round(product.price * 84).toLocaleString('en-IN')}
        </p>
      </div>

      {/* View Details button */}
      <div style={{ padding: '0 16px 16px' }}>
        <button
          style={{
            width: '100%',
            padding: '10px',
            background: isHovered
              ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
              : '#f8fafc',
            color: isHovered ? '#fff' : '#4f46e5',
            border: isHovered ? 'none' : '1.5px solid #c7d2fe',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          View Details
          <span style={{ fontSize: '14px' }}>→</span>
        </button>
      </div>
    </article>
  )
}

export default ProductCard
