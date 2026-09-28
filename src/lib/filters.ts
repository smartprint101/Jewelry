import { budgetRanges } from "@/data/collections";
import { searchProducts } from "@/lib/search";
import type { Product } from "@/types";

export type SortKey = "popular" | "new" | "price-asc" | "price-desc" | "discount";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "জনপ্রিয়" },
  { value: "new", label: "নতুন" },
  { value: "price-asc", label: "কম দাম থেকে বেশি" },
  { value: "price-desc", label: "বেশি দাম থেকে কম" },
  { value: "discount", label: "সর্বাধিক ডিসকাউন্ট" },
];

export interface FilterState {
  q: string;
  category: string[];
  material: string[];
  collection: string[];
  color: string[];
  size: string[];
  stone: string[];
  budget: string[];
  inStock: boolean;
  sort: SortKey;
}

export const emptyFilters: FilterState = {
  q: "",
  category: [],
  material: [],
  collection: [],
  color: [],
  size: [],
  stone: [],
  budget: [],
  inStock: false,
  sort: "popular",
};

/* ------------------------------ টোকেন ------------------------------ */

export const colorOptions = [
  "গোল্ড",
  "রোজ গোল্ড",
  "সিলভার",
  "অফ-হোয়াইট",
  "কালো",
] as const;

export function colorTokens(product: Product): string[] {
  const source = [
    product.specs.color ?? "",
    ...(product.variants?.map((variant) => variant.name) ?? []),
  ]
    .join(" ")
    .toLowerCase();

  const tokens = new Set<string>();
  if (source.includes("রোজ")) tokens.add("রোজ গোল্ড");
  if (source.includes("গোল্ড") && !source.startsWith("রোজ")) tokens.add("গোল্ড");
  if (source.includes("সিলভার") || source.includes("রুপা")) tokens.add("সিলভার");
  if (source.includes("হোয়াইট") || source.includes("পার্ল")) tokens.add("অফ-হোয়াইট");
  if (source.includes("কালো") || source.includes("অনিক্স")) tokens.add("কালো");
  if (product.materials.includes("pearl")) tokens.add("অফ-হোয়াইট");
  if (product.materials.includes("silver")) tokens.add("সিলভার");
  if (product.materials.includes("gold")) tokens.add("গোল্ড");
  return [...tokens];
}

export const stoneOptions = [
  "ডায়মন্ড",
  "পার্ল",
  "জিরকন",
  "কুন্দন",
  "অনিক্স",
  "স্টোন ছাড়া",
] as const;

export function stoneTokens(product: Product): string[] {
  const source = `${product.specs.stone ?? ""} ${product.specs.stoneType ?? ""}`.toLowerCase();
  const tokens = new Set<string>();
  if (source.includes("ডায়মন্ড")) tokens.add("ডায়মন্ড");
  if (source.includes("পার্ল")) tokens.add("পার্ল");
  if (source.includes("জিরক")) tokens.add("জিরকন");
  if (source.includes("কুন্দন")) tokens.add("কুন্দন");
  if (source.includes("অনিক্স")) tokens.add("অনিক্স");
  if (source.includes("ক্রিস্টাল")) tokens.add("জিরকন");
  if (tokens.size === 0) tokens.add("স্টোন ছাড়া");
  return [...tokens];
}

export function sizeTokens(product: Product): string[] {
  return product.size?.options ?? [];
}

/* ------------------------------ ফিল্টার ------------------------------ */

function matchesBudget(product: Product, budgets: string[]): boolean {
  if (budgets.length === 0) return true;
  return budgets.some((slug) => {
    const range = budgetRanges.find((item) => item.slug === slug);
    if (!range) return true;
    return product.price >= range.min && (range.max === null || product.price < range.max);
  });
}

export function applyFilters(products: Product[], filters: FilterState): Product[] {
  const base = filters.q.trim() ? searchProducts(filters.q) : products;
  const allowed = new Set(base.map((product) => product.slug));

  const filtered = products.filter((product) => {
    if (!allowed.has(product.slug)) return false;
    if (filters.category.length && !filters.category.includes(product.category)) return false;
    if (
      filters.material.length &&
      !product.materials.some((material) => filters.material.includes(material))
    )
      return false;
    if (
      filters.collection.length &&
      !product.collections.some((collection) => filters.collection.includes(collection))
    )
      return false;
    if (filters.color.length) {
      const tokens = colorTokens(product);
      if (!tokens.some((token) => filters.color.includes(token))) return false;
    }
    if (filters.stone.length) {
      const tokens = stoneTokens(product);
      if (!tokens.some((token) => filters.stone.includes(token))) return false;
    }
    if (filters.size.length) {
      const tokens = sizeTokens(product);
      if (!tokens.some((token) => filters.size.includes(token))) return false;
    }
    if (!matchesBudget(product, filters.budget)) return false;
    if (filters.inStock && product.stock <= 0) return false;
    return true;
  });

  if (filters.q.trim()) {
    const order = new Map(base.map((product, index) => [product.slug, index]));
    if (filters.sort === "popular") {
      return filtered.sort(
        (a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0),
      );
    }
  }

  return sortProducts(filtered, filters.sort);
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const items = [...products];
  switch (sort) {
    case "price-asc":
      return items.sort((a, b) => a.price - b.price);
    case "price-desc":
      return items.sort((a, b) => b.price - a.price);
    case "discount":
      return items.sort((a, b) => {
        const da = a.oldPrice ? (a.oldPrice - a.price) / a.oldPrice : 0;
        const db = b.oldPrice ? (b.oldPrice - b.price) / b.oldPrice : 0;
        return db - da;
      });
    case "new":
      return items.sort((a, b) => {
        const na = a.collections.includes("new-arrival") ? 1 : 0;
        const nb = b.collections.includes("new-arrival") ? 1 : 0;
        if (na !== nb) return nb - na;
        return b.id.localeCompare(a.id);
      });
    case "popular":
    default:
      return items.sort(
        (a, b) => b.rating * Math.log10(b.reviewCount + 2) - a.rating * Math.log10(a.reviewCount + 2),
      );
  }
}

/* --------------------------- URL সিঙ্ক্রোনাইজেশন --------------------------- */

export function filtersFromParams(params: URLSearchParams): FilterState {
  const list = (key: string) =>
    (params.get(key) ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

  const sort = (params.get("sort") ?? "popular") as SortKey;

  return {
    q: params.get("q") ?? "",
    category: list("category"),
    material: list("material"),
    collection: list("collection"),
    color: list("color"),
    size: list("size"),
    stone: list("stone"),
    budget: list("budget"),
    inStock: params.get("stock") === "in",
    sort: sortOptions.some((option) => option.value === sort) ? sort : "popular",
  };
}

export function paramsFromFilters(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.category.length) params.set("category", filters.category.join(","));
  if (filters.material.length) params.set("material", filters.material.join(","));
  if (filters.collection.length) params.set("collection", filters.collection.join(","));
  if (filters.color.length) params.set("color", filters.color.join(","));
  if (filters.size.length) params.set("size", filters.size.join(","));
  if (filters.stone.length) params.set("stone", filters.stone.join(","));
  if (filters.budget.length) params.set("budget", filters.budget.join(","));
  if (filters.inStock) params.set("stock", "in");
  if (filters.sort !== "popular") params.set("sort", filters.sort);
  return params;
}

export function countActiveFilters(filters: FilterState, locked?: keyof FilterState): number {
  const keys: (keyof FilterState)[] = [
    "category",
    "material",
    "collection",
    "color",
    "size",
    "stone",
    "budget",
  ];
  let count = keys.reduce((sum, key) => {
    if (locked === key) return sum;
    const value = filters[key];
    return sum + (Array.isArray(value) ? value.length : 0);
  }, 0);
  if (filters.inStock) count += 1;
  return count;
}
