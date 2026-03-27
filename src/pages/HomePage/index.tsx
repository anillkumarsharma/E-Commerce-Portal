import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Product, SortOrder } from '../../types'
import {fetchAllProducts,fetchProductsByCategories,fetchCategories,}from '../../api/productApi'
import ProductCard from '../../components/ProductCard'
import CategoryFilter from '../../components/CategoryFilter'
import Loader from '../../components/Loader'
import styles from '../../styles/HomePage.module.css'

const HomePage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getFiltersFromURL = useCallback(() => {
    const params = new URLSearchParams(location.search)
    const categories = params.getAll('category')
    const sort = (params.get('sort') || '') as SortOrder
    return { selectedCategories: categories, sortOrder: sort }
  }, [location.search])

  const { selectedCategories, sortOrder } = getFiltersFromURL()

  const updateURL = useCallback(
    (newCategories: string[], newSort: SortOrder) => {
      const params = new URLSearchParams()
      newCategories.forEach((cat) => params.append('category', cat))
      if (newSort) params.set('sort', newSort)
      navigate(
        { search: params.toString() },
        { replace: false }
      )
    },
    [navigate]
  )

  //Fetch Categories

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch {
        console.error('Failed to fetch categories')
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        let data: Product[]
        if (selectedCategories.length > 0) {
          data = await fetchProductsByCategories(selectedCategories, sortOrder || undefined)
        } else {
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
  }, [location.search])

  const handleCategoryChange = (category: string) => {
    let newCategories: string[]
    if (selectedCategories.includes(category)) {
      newCategories = selectedCategories.filter((c) => c !== category)
    } else {
      newCategories = [...selectedCategories, category]
    }
    updateURL(newCategories, sortOrder)
  }

  const handleSortChange = (sort: SortOrder) => {
    updateURL(selectedCategories, sort)
  }

  const handleClearFilters = () => {
    navigate({ search: '' }, { replace: false })
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Discover Amazing Products</h1>
        <p className={styles.heroSubtitle}>Shop the best deals across all categories</p>
        {!loading && (
          <div className={styles.productCount}>
            <span className={styles.productCountText}>
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </span>
          </div>
        )}
        {products.length > 0 && (
          <div className={styles.marqueeWrapper}>
            <div className={styles.leftFade} />
            <div className={styles.rightFade} />
            <div className={styles.marqueeTrack}>
              {[...products, ...products].map((product, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/product/${product.id}/details`)}
                  className={styles.marqueeItem}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.marqueeImage}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <main className={styles.main}>
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          sortOrder={sortOrder}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />
        {loading && <Loader />}

        {error && !loading && (
          <div className={styles.errorState}>
            <p className={styles.errorMsg}>{error}</p>
            <button
              onClick={() => updateURL(selectedCategories, sortOrder)}
              className={styles.retryBtn}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className={styles.grid}>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyIcon}>🔍</p>
                <p className={styles.emptyTitle}>No products found</p>
                <p className={styles.emptySubtitle}>Try adjusting or clearing your filters</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default HomePage
