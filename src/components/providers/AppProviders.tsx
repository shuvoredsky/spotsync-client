"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { initializeAuth } from "@/store/slices/authSlice";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(initializeAuth());
  }, []);

  return <>{children}</>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 1000 * 30,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                borderRadius: "0.75rem",
                fontFamily: "var(--font-jakarta), Inter, sans-serif",
              },
            }}
          />
        </AuthInitializer>
      </QueryClientProvider>
    </Provider>
  );
}
