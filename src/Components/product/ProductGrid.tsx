// =====================================================
// PRODUCT GRID — сетка карточек товаров
// =====================================================
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Spinner'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  view?: 'grid' | 'list'
  isLoading?: boolean
  skeletonCount?: number
}

export function ProductGrid({
  products,
  view = 'grid',
  isLoading = false,
  skeletonCount = 12,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div style={{
        display: view === 'grid' ? 'grid' : 'flex',
        flexDirection: view === 'list' ? 'column' : undefined,
        gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(220px, 1fr))' : undefined,
        gap: '1.25rem',
      }}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div style={{
        padding: '3rem', textAlign: 'center',
        color: 'var(--color-text-muted)', border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
      }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Товары не найдены</p>
        <p style={{ fontSize: '0.875rem' }}>Попробуйте изменить параметры фильтра</p>
      </div>
    )
  }

  return (
    <div style={{
      display: view === 'grid' ? 'grid' : 'flex',
      flexDirection: view === 'list' ? 'column' : undefined,
      gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(220px, 1fr))' : undefined,
      gap: '1.25rem',
    }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} view={view} />
      ))}
    </div>
  )
}
