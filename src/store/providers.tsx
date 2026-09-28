"use client";

import { CartProvider } from "@/store/cart-context";
import { ToastProvider } from "@/store/toast-context";
import { WishlistProvider } from "@/store/wishlist-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
