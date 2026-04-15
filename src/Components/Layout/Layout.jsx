import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

/**
 * Корневой layout — оборачивает все страницы.
 * Outlet рендерит текущую страницу из роутера.
 * ScrollRestoration возвращает скролл в начало при переходе между страницами.
 */
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Основной контент страницы */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Автоматически скроллит вверх при навигации */}
      <ScrollRestoration />
    </div>
  )
}
