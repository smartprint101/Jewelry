import type { CustomerOrder } from "@/types";

const STORAGE_KEY = "aurelia-orders-v1";

/** ডেমো অর্ডার ব্রাউজারেই সংরক্ষণ করা হয়—কোনো সার্ভার বা ডেটাবেজ নেই */
function readAll(): Record<string, CustomerOrder> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, CustomerOrder>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveOrder(order: CustomerOrder): void {
  if (typeof window === "undefined") return;
  try {
    const all = readAll();
    all[order.id] = order;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    window.sessionStorage.setItem("aurelia-last-order", order.id);
  } catch {
    /* ডেমো: স্টোরেজ না থাকলেও অর্ডার কনফার্মেশন দেখানো হবে */
  }
}

export function getOrder(id: string): CustomerOrder | null {
  return readAll()[id] ?? null;
}

export function getLastOrder(): CustomerOrder | null {
  if (typeof window === "undefined") return null;
  const id = window.sessionStorage.getItem("aurelia-last-order");
  return id ? getOrder(id) : null;
}
