import { Link } from 'react-router-dom'

/**
 * Хлебные крошки.
 * items: Array<{ label: string, to?: string }>
 * Последний элемент — активный (без ссылки).
 *
 * Пример: <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
 */
export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-white/80">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <span key={idx} className="flex items-center gap-2">
            {/* Разделитель */}
            {idx > 0 && <span className="opacity-60">›</span>}

            {/* Ссылка или текст */}
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-white font-medium' : ''}>
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
