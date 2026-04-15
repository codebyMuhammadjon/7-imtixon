import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Components/Layout/Layout.jsx";

/**
 * Все страницы грузятся лениво (lazy) — меньше начальный бандл.
 * Suspense показывает минимальный спиннер пока страница загружается.
 */
const Home = lazy(() => import("../Pages/Home.jsx"));
const Shop = lazy(() => import("../Pages/Shop.jsx"));
const ProductDetail = lazy(() => import("../Pages/ProductDetail.jsx"));
const Cart = lazy(() => import("../Pages/Cart.jsx"));
const Checkout = lazy(() => import("../Pages/Checkout.jsx"));
const BlogList = lazy(() => import("../Pages/BlogList.jsx"));
const BlogDetail = lazy(() => import("../Pages/BlogDetail.jsx"));
const FAQ = lazy(() => import("../Pages/FAQ.jsx"));
const NotFound = lazy(() => import("../Pages/NotFound.jsx"));

// Простой fallback на время загрузки страницы
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div
        className="w-8 h-8 border-2 border-[#E44B26] border-t-transparent rounded-full animate-spin
      "
      />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "shop",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "blog",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BlogList />
          </Suspense>
        ),
      },
      {
        path: "blog/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BlogDetail />
          </Suspense>
        ),
      },
      {
        path: "faq",
        element: (
          <Suspense fallback={<PageLoader />}>
            <FAQ />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
