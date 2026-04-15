import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRouter from "./Router/index.jsx";
import "./index.css";

/**
 * Конфигурация React Query.
 * - staleTime: данные считаются свежими 60 секунд
 * - retry: при ошибке повторяем 1 раз
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false, // не рефетчить при переключении вкладок
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      {/* DevTools только в dev-режиме — в проде не включается */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>,
);
