// ─── Заглушки страниц ───────────────────────────────────────────────
// Каждая страница будет реализована в следующих итерациях.
// Пока показывают название и ссылку назад.

import { Link } from 'react-router-dom'

function StubPage({ title }) {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-400 mb-6">Страница в разработке</p>
      <Link to="/" className="text-[#E44B26] hover:underline text-sm">
        ← Вернуться на главную
      </Link>
    </div>
  )
}

export function Shop()          { return <StubPage title="Shop" /> }
export function ProductDetail() { return <StubPage title="Product Detail" /> }
export function Cart()          { return <StubPage title="Cart" /> }
export function Checkout()      { return <StubPage title="Checkout" /> }
export function BlogList()      { return <StubPage title="Blog" /> }
export function BlogDetail()    { return <StubPage title="Blog Post" /> }
export function FAQ()           { return <StubPage title="FAQ" /> }
export function NotFound()      { return <StubPage title="404 — Page Not Found" /> }
