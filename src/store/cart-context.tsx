"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, Product } from "@/types";

const STORAGE_KEY = "aurelia-cart-v1";

interface AddOptions {
  quantity?: number;
  variant?: string;
  size?: string;
  image?: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (product: Product, options?: AddOptions) => CartItem;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function buildKey(productId: string, variant?: string, size?: string) {
  return [productId, variant ?? "-", size ?? "-"].join("::");
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        // localStorage থেকে হাইড্রেশন—ক্লায়েন্টে একবারই চলে
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ডেমো: স্টোরেজ পড়া না গেলে খালি কার্ট */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* উপেক্ষা */
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, options: AddOptions = {}) => {
    const { quantity = 1, variant, size, image } = options;
    const key = buildKey(product.id, variant, size);
    const newItem: CartItem = {
      key,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: image ?? product.images[0],
      price: product.price,
      oldPrice: product.oldPrice,
      quantity,
      variant,
      size,
      sku: product.sku,
      maxStock: product.stock,
    };

    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, Math.max(item.maxStock, 1)),
              }
            : item,
        );
      }
      return [...current, newItem];
    });

    return newItem;
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.key === key
            ? { ...item, quantity: Math.max(1, Math.min(quantity, item.maxStock || 99)) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      items,
      count,
      subtotal,
      hydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [items, hydrated, addItem, updateQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
