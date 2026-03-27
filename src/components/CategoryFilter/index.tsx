import type { SortOrder } from '../../types'
import styles from '../../styles/CategoryFilter.module.css'

interface CategoryFilterProps {
  categories: string[]
  selectedCategories: string[]
  sortOrder: SortOrder
  onCategoryChange: (category: string) => void
  onSortChange: (sort: SortOrder) => void
  onClearFilters: () => void
}


const CategoryFilter = ({categories,selectedCategories,sortOrder,onCategoryChange,onSortChange,onClearFilters,}: CategoryFilterProps) => {
  const hasActiveFilters = selectedCategories.length > 0 || sortOrder !== ''

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.categoriesSection}>
          <p className={styles.label}>Categories</p>
          <div className={styles.buttonsRow}>
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category)
              return (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`${styles.categoryBtn} ${isSelected ? styles.categoryBtnActive : ''}`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>
        <div className={styles.sortSection}>
          <div>
            <p className={styles.label}>Sort by Price</p>
            <select
              value={sortOrder}
              onChange={(e) => onSortChange(e.target.value as SortOrder)}
              className={`${styles.sortSelect} ${sortOrder ? styles.sortSelectActive : ''}`}
            >
              <option value="">Default</option>
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>
          </div>
          {hasActiveFilters && (
            <button onClick={onClearFilters} className={styles.clearBtn}>
              ✕ Clear
            </button>
          )}
        </div>
      </div>
      {selectedCategories.length > 0 && (
        <div className={styles.activeTags}>
          <span className={styles.activeTagsLabel}>Active:</span>
          {selectedCategories.map((cat) => (
            <span key={cat} className={styles.activeTag}>{cat}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryFilter
