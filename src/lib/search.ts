import { categories, materials } from "@/data/categories";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import type { Product } from "@/types";

function haystack(product: Product): string {
  const categoryName =
    categories.find((category) => category.slug === product.category)?.name ?? "";
  const categoryNameEn =
    categories.find((category) => category.slug === product.category)?.nameEn ?? "";
  const materialNames = product.materials
    .map((slug) => {
      const material = materials.find((item) => item.slug === slug);
      return `${material?.name ?? ""} ${material?.nameEn ?? ""}`;
    })
    .join(" ");
  const collectionNames = product.collections
    .map((slug) => {
      const collection = collections.find((item) => item.slug === slug);
      return `${collection?.name ?? ""} ${collection?.nameEn ?? ""}`;
    })
    .join(" ");

  return [
    product.name,
    product.nameEn,
    product.sku,
    categoryName,
    categoryNameEn,
    materialNames,
    collectionNames,
    product.shortDescription,
    product.tags.join(" "),
    product.specs.metal ?? "",
    product.specs.stone ?? "",
  ]
    .join(" ")
    .toLowerCase();
}

const index = products.map((product) => ({
  product,
  text: haystack(product),
}));

/** দ্রুত সার্চ—নাম, ক্যাটাগরি, ম্যাটেরিয়াল, কালেকশন ও ট্যাগে খোঁজে */
export function searchProducts(query: string, limit?: number): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const words = q.split(/\s+/).filter(Boolean);

  const scored = index
    .map(({ product, text }) => {
      let score = 0;
      for (const word of words) {
        if (!text.includes(word)) return { product, score: -1 };
        score += 1;
        if (product.name.toLowerCase().includes(word)) score += 3;
        if (product.nameEn.toLowerCase().includes(word)) score += 2;
        if (product.tags.some((tag) => tag.toLowerCase() === word)) score += 2;
      }
      score += product.rating / 10;
      return { product, score };
    })
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);

  return typeof limit === "number" ? scored.slice(0, limit) : scored;
}

export interface SearchSuggestion {
  label: string;
  href: string;
  type: string;
}

/** ক্যাটাগরি/ম্যাটেরিয়াল/কালেকশন সাজেশন */
export function searchSuggestions(query: string, limit = 5): SearchSuggestion[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const items: SearchSuggestion[] = [
    ...categories.map((category) => ({
      label: category.name,
      href: `/category/${category.slug}`,
      type: "ক্যাটাগরি",
      match: `${category.name} ${category.nameEn}`.toLowerCase(),
    })),
    ...materials.map((material) => ({
      label: material.name,
      href: `/shop?material=${material.slug}`,
      type: "ম্যাটেরিয়াল",
      match: `${material.name} ${material.nameEn}`.toLowerCase(),
    })),
    ...collections.map((collection) => ({
      label: collection.name,
      href: `/collection/${collection.slug}`,
      type: "কালেকশন",
      match: `${collection.name} ${collection.nameEn}`.toLowerCase(),
    })),
  ]
    .filter((item) => item.match.includes(q))
    .slice(0, limit)
    .map(({ label, href, type }) => ({ label, href, type }));

  return items;
}

export const popularSearches = [
  "রিং",
  "নেকলেস",
  "ঝুমকা",
  "গোল্ড",
  "ডায়মন্ড",
  "পার্ল",
  "ব্রাইডাল",
];
