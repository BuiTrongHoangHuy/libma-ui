"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Tạo QueryClient với các tùy chọn mặc định
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Không refetch khi focus vào window
      staleTime: 5 * 60 * 1000, // Thời gian stale là 5 phút
      retry: false, // Không retry khi query thất bại
    },
  },
});

// Component Provider
export default function Provider({ children }) {
  return (
    // Bao bọc children bằng QueryClientProvider để cung cấp queryClient cho toàn bộ ứng dụng
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
