// =====================================================
// PRODUCT CARD — карточка товара (grid и list вид)
// =====================================================
import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import { useUiStore } from '@/store/uiStore'
import { Rating } from '@/components/ui/Rating'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/utils/searchParams'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  view?: 'grid' | 'list'
}

export function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const { toggleWishlist, isInWishlist } = useUiStore()
  const inWishlist = isInWishlist(product.id)

  if (view === 'list') {
    return <ProductListItem product={product} />
  }

  return (
    <div className="product-card fade-in-up group">
      {/* Бейдж (Hot/Sale/New) */}
      {product.badge && (
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
          <Badge type={product.badge} />
        </div>
      )}

      {/* Кнопка вишлиста */}
      <button
        onClick={() => toggleWishlist(product.id)}
        title={inWishlist ? 'Убрать из вишлиста' : 'В вишлист'}
        style={{
          position: 'absolute', top: '10px', right: '10px', zIndex: 2,
          background: inWishlist ? 'var(--color-primary)' : '#fff',
          border: '1px solid var(--color-border)',
          borderRadius: '50%', width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.2s',
          opacity: 0, // показываем при hover через group
        }}
        className="group-hover:opacity-100"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill={inWishlist ? '#fff' : 'none'}
          stroke={inWishlist ? '#fff' : 'var(--color-primary)'} strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      {/* Изображение */}
      <Link to={`/products/${product.slug}`}>
        <div style={{
          height: '190px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', padding: '1rem', background: '#fafafa',
          overflow: 'hidden',
        }}>
          <img
            src={product.image_url || '/assets/images/hero-main.png'}
            alt={product.name}
            style={{ maxHeight: '160px', maxWidth: '100%', objectFit: 'contain',
              transition: 'transform 0.3s' }}
            className="group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Инфо */}
      <div style={{ padding: '0.875rem 1rem 1rem' }}>
        {/* Категория */}
        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)',
          textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
          {product.category?.name ?? '—'}
        </p>

        {/* Рейтинг */}
        <Rating value={product.rating} count={product.reviews_count} />

        {/* Название */}
        <Link to={`/products/${product.slug}`}
          style={{ display: 'block', marginTop: '6px', marginBottom: '8px',
            fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text)',
            textDecoration: 'none', lineHeight: 1.4 }}
          className="hover:text-red-500 transition-colors line-clamp-2"
        >
          {product.name}
        </Link>

        {/* Цена + кнопка */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="price-current">{formatPrice(product.price)}</span>
            {product.old_price && (
              <span className="price-old">{formatPrice(product.old_price)}</span>
            )}
          </div>

          <button
            onClick={() => addItem(product)}
            className="btn-primary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', gap: '4px' }}
            title="Добавить в корзину"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

// --------- List вид карточки ---------
function ProductListItem({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div style={{
      display: 'flex', gap: '1.25rem', padding: '1rem',
      border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)',
      background: '#fff', transition: 'box-shadow 0.2s',
    }}
      className="hover:shadow-md"
    >
      {/* Изображение */}
      <Link to={`/products/${product.slug}`} style={{ flexShrink: 0 }}>
        <div style={{ width: '120px', height: '120px', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: '#fafafa', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
          <img src={product.image_url || '/assets/images/hero-main.png'}
            alt={product.name}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            loading="lazy"
          />
        </div>
      </Link>

      {/* Контент */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)',
              textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
              {product.category?.name ?? '—'}
            </p>
            <Link to={`/products/${product.slug}`}
              style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text)', textDecoration: 'none' }}
              className="hover:text-red-500 transition-colors"
            >
              {product.name}
            </Link>
            <div style={{ marginTop: '4px' }}>
              <Rating value={product.rating} count={product.reviews_count} />
            </div>
            {product.description && (
              <p style={{ marginTop: '8px', fontSize: '0.85rem',
                color: 'var(--color-text-muted)', lineHeight: 1.5 }}
                className="line-clamp-2"
              >
                {product.description}
              </p>
            )}
          </div>

          {/* Цена и кнопка */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ marginBottom: '8px' }}>
              <span className="price-current" style={{ fontSize: '1.1rem' }}>
                {formatPrice(product.price)}
              </span>
              {product.old_price && (
                <div><span className="price-old">{formatPrice(product.old_price)}</span></div>
              )}
            </div>
            <button onClick={() => addItem(product)} className="btn-primary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
