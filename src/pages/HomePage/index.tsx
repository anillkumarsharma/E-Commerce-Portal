import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Product, SortOrder } from '../../types'
import {
  fetchAllProducts,
  fetchProductsByCategories,
  fetchCategories,
} from '../../api/productApi'
import ProductCard from '../../components/ProductCard'
import CategoryFilter from '../../components/CategoryFilter'
import Loader from '../../components/Loader'
import useWindowSize from '../../hooks/useWindowSize'

const HomePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const isMobile = width < 640

  // ── State ──────────────────────────────────────────────────────────────
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ── URL Filter Parsing ─────────────────────────────────────────────────
  // LOGIC: URL se filters padhne ke liye browser ka URLSearchParams use karo
  // NOTE: We are NOT using React Router's useSearchParams hook (as per assignment)
  // Instead, we manually parse location.search using the browser's URLSearchParams API
  const getFiltersFromURL = useCallback(() => {
    // LOGIC: aapko yahan apni logic likhni hai
    const params = new URLSearchParams(location.search)
    const categories = params.getAll('category') // multiple categories support
    const sort = (params.get('sort') || '') as SortOrder
    return { selectedCategories: categories, sortOrder: sort }
  }, [location.search])

  const { selectedCategories, sortOrder } = getFiltersFromURL()

  // ── URL Update ─────────────────────────────────────────────────────────
  // LOGIC: Filter change hone par URL update karo - yahi persistence ka core hai
  // Browser history mein add hota hai, so back button kaam karta hai
  const updateURL = useCallback(
    (newCategories: string[], newSort: SortOrder) => {
      // LOGIC: aapko yahan apni logic likhni hai
      const params = new URLSearchParams()
      newCategories.forEach((cat) => params.append('category', cat))
      if (newSort) params.set('sort', newSort)

      navigate(
        { search: params.toString() },
        { replace: false } // LOGIC: replace: false = back button kaam kare
      )
    },
    [navigate]
  )

  // ── Fetch Categories ───────────────────────────────────────────────────
  useEffect(() => {
    const loadCategories = async () => {
      try {
        // LOGIC: aapko yahan apni logic likhni hai - categories fetch karo
        const data = await fetchCategories()
        setCategories(data)
      } catch {
        console.error('Failed to fetch categories')
      }
    }
    loadCategories()
  }, [])

  // ── Fetch Products ─────────────────────────────────────────────────────
  // LOGIC: Filters change hone par products refetch hote hain - local filtering NAHI hoti
  // Yeh useEffect location.search pe depend karta hai
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        let data: Product[]

        // LOGIC: aapko yahan apni logic likhni hai
        if (selectedCategories.length > 0) {
          // LOGIC: Agar categories selected hain to unke liye API call karo
          data = await fetchProductsByCategories(selectedCategories, sortOrder || undefined)
        } else {
          // LOGIC: Koi filter nahi - sare products fetch karo
          data = await fetchAllProducts(sortOrder || undefined)
        }

        setProducts(data)
      } catch {
        setError('Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [location.search]) // LOGIC: location.search badlega to products refetch honge

  // ── Event Handlers ─────────────────────────────────────────────────────

  // LOGIC: Category button click - toggle selection
  const handleCategoryChange = (category: string) => {
    // LOGIC: aapko yahan apni logic likhni hai
    let newCategories: string[]
    if (selectedCategories.includes(category)) {
      // LOGIC: Already selected hai to remove karo
      newCategories = selectedCategories.filter((c) => c !== category)
    } else {
      // LOGIC: Naya category add karo (multiple select)
      newCategories = [...selectedCategories, category]
    }
    updateURL(newCategories, sortOrder)
  }

  // LOGIC: Sort dropdown change
  const handleSortChange = (sort: SortOrder) => {
    // LOGIC: aapko yahan apni logic likhni hai
    updateURL(selectedCategories, sort)
  }

  // LOGIC: Clear all filters - URL se saare params hata do
  const handleClearFilters = () => {
    // LOGIC: aapko yahan apni logic likhni hai
    navigate({ search: '' }, { replace: false })
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: 'calc(100vh - 140px)', backgroundColor: '#f8fafc' }}>
      {/* Hero Banner */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #a855f7 100%)',
        padding: isMobile ? '32px 0 0 0' : '48px 0 0 0',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <h1 style={{
          margin: '0 0 8px 0',
          fontSize: isMobile ? '26px' : '36px',
          fontWeight: '800',
          color: '#ffffff',
          letterSpacing: '-0.5px',
          padding: isMobile ? '0 16px' : '0 32px',
        }}>
          Discover Amazing Products
        </h1>
        <p style={{
          margin: 0,
          fontSize: isMobile ? '14px' : '16px',
          color: 'rgba(255,255,255,0.8)',
          fontWeight: '400',
          padding: isMobile ? '0 16px' : '0 32px',
        }}>
          Shop the best deals across all categories
        </p>
        {!loading && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '16px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            padding: '6px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.3)',
          }}>
            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '500' }}>
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </span>
          </div>
        )}

        {/* Sliding Product Images Strip */}
        {products.length > 0 && (
          <div style={{
            marginTop: '28px',
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
          }}>
            {/* Left fade */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
              background: 'linear-gradient(to right, rgba(79,70,229,0.9), transparent)',
              pointerEvents: 'none',
            }} />
            {/* Right fade */}
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
              background: 'linear-gradient(to left, rgba(124,58,237,0.9), transparent)',
              pointerEvents: 'none',
            }} />

            <div className="marquee-track">
              {[...products, ...products].map((product, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/product/${product.id}/details`)}
                  style={{
                    width: isMobile ? '90px' : '110px',
                    height: isMobile ? '90px' : '110px',
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    borderRadius: '14px',
                    margin: '0 8px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <main style={{ width: '100%', padding: isMobile ? '20px 16px' : '28px 32px', boxSizing: 'border-box' }}>
        {/* Category Filter Component */}
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          sortOrder={sortOrder}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />

        {/* Loading State */}
        {loading && <Loader />}

        {/* Error State */}
        {error && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '48px 40px',
            backgroundColor: '#fff5f5',
            borderRadius: '16px',
            border: '1px solid #fecaca',
          }}>
            <p style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#dc2626' }}>{error}</p>
            <button
              onClick={() => updateURL(selectedCategories, sortOrder)}
              style={{
                padding: '10px 28px',
                backgroundColor: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products grid */}
        {!loading && !error && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {products.length > 0 ? (
              products.map((product) => (
                // LOGIC: aapko yahan apni logic likhni hai - har product ka card render karo
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div style={{
                width: '100%',
                textAlign: 'center',
                padding: '80px 20px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
              }}>
                <p style={{ fontSize: '40px', margin: '0 0 12px 0' }}>🔍</p>
                <p style={{ fontSize: '17px', fontWeight: '600', color: '#374151', margin: '0 0 6px 0' }}>No products found</p>
                <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Try adjusting or clearing your filters</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default HomePage
