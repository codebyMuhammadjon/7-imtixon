// =====================================================
// PRODUCT FILTERS — сайдбар фильтров для Shop страницы
// Все параметры хранятся в URL SearchParams
// =====================================================
import { useSearchParams } from 'react-router-dom'
import { useCategories } from '@/hooks/useCategories'
import { buildSearchParams, parseSearchParams } from '@/utils/searchParams'
import { useState, useEffect } from 'react'

// Предопределённые теги для фильтрации
const PRODUCT_TAGS = ['Vegetables', 'Juice', 'Food', 'Dry Fruits']

// Варианты весовых пакетов
const WEIGHT_OPTIONS = ['2kg Pack', '20kg Pack', '30kg Pack']

export function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = parseSearchParams(searchParams)
  const { data: categories = [] } = useCategories()

  // Локальное состояние слайдера цен (применяется при нажатии "Filter")
  const [priceRange, setPriceRange] = useState([
    params.min_price ?? 20,
    params.max_price ?? 250,
  ])

  // Синхронизируем локальный стейт с URL при навигации назад/вперёд
  useEffect(() => {
    setPriceRange([params.min_price ?? 20, params.max_price ?? 250])
  }, [params.min_price, params.max_price])

  // Применить фильтр цены
  function applyPriceFilter() {
    setSearchParams(
      buildSearchParams(searchParams, {
        min_price: priceRange[0],
        max_price: priceRange[1],
      })
    )
  }

  // Переключить категорию
  function toggleCategory(slug: string) {
    const current = params.category
    setSearchParams(
      buildSearchParams(searchParams, {
        category: current === slug ? undefined : slug,
      })
    )
  }

  const sectionStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid var(--color-border)',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.95rem',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '0.75rem',
    display: 'block',
  }

  return (
    <aside style={{ width: '220px', flexShrink: 0 }}>
      {/* ---------- Категории ---------- */}
      <div style={sectionStyle}>
        <span style={labelStyle}>Product Category</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {categories.map((cat) => (
            <label key={cat.id}
              style={{ display: 'flex', alignItems: 'center', gap: '8px',
                cursor: 'pointer', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              <input
                type="checkbox"
                checked={params.category === cat.slug}
                onChange={() => toggleCategory(cat.slug)}
                style={{ accentColor: 'var(--color-primary)', width: '15px', height: '15px' }}
              />
              <span>{cat.name}</span>
              {cat.products_count !== undefined && (
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem',
                  color: 'var(--color-text-light)' }}>
                  [{cat.products_count}]
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* ---------- Фильтр по цене ---------- */}
      <div style={sectionStyle}>
        <span style={labelStyle}>Filter By Price</span>
        <input
          type="range"
          min={0}
          max={500}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
        />
        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: '6px 0 10px' }}>
          Price: ${priceRange[0]} – ${priceRange[1]}
        </p>
        <button onClick={applyPriceFilter} className="btn-primary"
          style={{ padding: '0.4rem 1.2rem', fontSize: '0.8rem' }}>
          Filter
        </button>
      </div>

      {/* ---------- Цвет ---------- */}
      <div style={sectionStyle}>
        <span style={labelStyle}>Product Category</span>
        {[
          { label: 'Blue',   color: '#4dabf7' },
          { label: 'Yellow', color: '#ffd43b' },
          { label: 'Red',    color: '#f13a2f' },
          { label: 'Green',  color: '#2db224' },
        ].map(({ label, color }) => (
          <label key={label}
            style={{ display: 'flex', alignItems: 'center', gap: '8px',
              cursor: 'pointer', fontSize: '0.875rem', marginBottom: '6px',
              color: 'var(--color-text-muted)' }}>
            <input type="checkbox"
              style={{ accentColor: color, width: '15px', height: '15px' }}
            />
            {label}
            <span style={{ marginLeft: 'auto', width: '14px', height: '14px',
              borderRadius: '2px', background: color, flexShrink: 0 }} />
          </label>
        ))}
      </div>

      {/* ---------- Вес ---------- */}
      <div style={sectionStyle}>
        <span style={labelStyle}>Weight</span>
        {WEIGHT_OPTIONS.map((w) => (
          <label key={w}
            style={{ display: 'flex', alignItems: 'center', gap: '8px',
              cursor: 'pointer', fontSize: '0.875rem', marginBottom: '6px',
              color: 'var(--color-text-muted)' }}>
            <input type="checkbox"
              style={{ accentColor: 'var(--color-primary)', width: '15px', height: '15px' }} />
            {w}
          </label>
        ))}
      </div>

      {/* ---------- Теги ---------- */}
      <div>
        <span style={labelStyle}>Products Tags</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {PRODUCT_TAGS.map((tag) => (
            <span key={tag}
              style={{
                padding: '4px 10px',
                border: '1px solid var(--color-border)',
                borderRadius: '3px',
                fontSize: '0.78rem',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                background: '#fff',
              }}
              className="hover:border-red-400 hover:text-red-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}
