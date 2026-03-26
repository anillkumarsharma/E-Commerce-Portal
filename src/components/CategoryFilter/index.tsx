import type { SortOrder } from '../../types'
import useWindowSize from '../../hooks/useWindowSize'

interface CategoryFilterProps {
  categories: string[]
  selectedCategories: string[]
  sortOrder: SortOrder
  // LOGIC: Callbacks - parent component mein filter change hone par ye call hote hain
  onCategoryChange: (category: string) => void
  onSortChange: (sort: SortOrder) => void
  onClearFilters: () => void
}

const CategoryFilter = ({
  categories,
  selectedCategories,
  sortOrder,
  onCategoryChange,
  onSortChange,
  onClearFilters,
}: CategoryFilterProps) => {
  const { width } = useWindowSize()
  const isMobile = width < 640
  const hasActiveFilters = selectedCategories.length > 0 || sortOrder !== ''

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: isMobile ? '16px' : '20px 24px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '20px',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          flexWrap: 'wrap',
        }}
      >
        {/* Category Filters */}
        <div style={{ flex: 1 }}>
          <p style={{
            margin: '0 0 10px 0',
            fontSize: '11px',
            fontWeight: '700',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            Categories
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((category) => {
              // LOGIC: aapko yahan apni logic likhni hai - check if this category is selected
              const isSelected = selectedCategories.includes(category)
              return (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: isSelected ? '1.5px solid #4f46e5' : '1.5px solid #e2e8f0',
                    backgroundColor: isSelected ? '#4f46e5' : '#f8fafc',
                    color: isSelected ? '#fff' : '#64748b',
                    fontSize: '13px',
                    fontWeight: isSelected ? '600' : '400',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 2px 8px rgba(79,70,229,0.3)' : 'none',
                  }}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        {/* Sort + Clear row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
          <div>
            <p style={{
              margin: '0 0 10px 0',
              fontSize: '11px',
              fontWeight: '700',
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              Sort by Price
            </p>
            <select
              value={sortOrder}
              onChange={(e) => onSortChange(e.target.value as SortOrder)}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                border: sortOrder ? '1.5px solid #4f46e5' : '1.5px solid #e2e8f0',
                backgroundColor: sortOrder ? '#eef2ff' : '#f8fafc',
                color: sortOrder ? '#4f46e5' : '#374151',
                fontSize: '13px',
                fontWeight: sortOrder ? '600' : '400',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="">Default</option>
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>
          </div>

          {/* Clear Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: '1.5px solid #fecaca',
                backgroundColor: '#fff5f5',
                color: '#dc2626',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Active filter tags */}
      {selectedCategories.length > 0 && (
        <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Active:
          </span>
          {selectedCategories.map((cat) => (
            <span
              key={cat}
              style={{
                fontSize: '12px',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #eef2ff, #f5f3ff)',
                color: '#4f46e5',
                padding: '3px 12px',
                borderRadius: '20px',
                textTransform: 'capitalize',
                border: '1px solid #c7d2fe',
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryFilter
