import type { CollectionSlug } from "@/types";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  nameEn: string;
  subtitle: string;
  description: string;
  image: string;
  /** হোমপেজে সেকশন হিসেবে দেখানো হবে কি না */
  onHome: boolean;
}

export const collections: Collection[] = [
  {
    slug: "new-arrival",
    name: "নতুন কালেকশন",
    nameEn: "New Arrival",
    subtitle: "এই সপ্তাহে যুক্ত হওয়া ডিজাইন",
    description:
      "সদ্য যুক্ত হওয়া ডিজাইনগুলো—সীমিত সংখ্যায় তৈরি, তাই পছন্দের ডিজাইনটি দ্রুত সংগ্রহ করুন।",
    image: "/collections/new-arrival.jpg",
    onHome: true,
  },
  {
    slug: "best-seller",
    name: "বেস্ট সেলার",
    nameEn: "Best Seller",
    subtitle: "গ্রাহকদের সবচেয়ে পছন্দের",
    description:
      "সবচেয়ে বেশি অর্ডার হওয়া ডিজাইনগুলো এক জায়গায়—যা পছন্দ করেছেন হাজারো গ্রাহক।",
    image: "/collections/best-seller.jpg",
    onHome: true,
  },
  {
    slug: "bridal",
    name: "ব্রাইডাল কালেকশন",
    nameEn: "Bridal Collection",
    subtitle: "বিশেষ দিনের সম্পূর্ণ সাজ",
    description:
      "আপনার জীবনের সবচেয়ে স্মরণীয় মুহূর্তের জন্য বেছে নিন বিশেষভাবে সাজানো গয়নার সংগ্রহ।",
    image: "/brand/bridal.jpg",
    onHome: true,
  },
  {
    slug: "everyday",
    name: "দৈনন্দিন গয়না",
    nameEn: "Everyday Jewelry",
    subtitle: "হালকা, আরামদায়ক ডিজাইন",
    description:
      "অফিস, ক্লাস কিংবা ঘরোয়া আয়োজন—সারাদিন পরে থাকার মতো হালকা ও আরামদায়ক গয়না।",
    image: "/collections/everyday.jpg",
    onHome: true,
  },
  {
    slug: "occasion",
    name: "বিশেষ দিনের গয়না",
    nameEn: "Occasion Jewelry",
    subtitle: "উৎসব ও দাওয়াতের জন্য",
    description:
      "বিয়ের দাওয়াত, ঈদ কিংবা পারিবারিক অনুষ্ঠান—বিশেষ দিনে আলাদা করে চোখে পড়ার মতো ডিজাইন।",
    image: "/collections/occasion.jpg",
    onHome: true,
  },
  {
    slug: "gift-set",
    name: "গিফট সেট",
    nameEn: "Gift Set",
    subtitle: "উপহারের জন্য সাজানো",
    description:
      "প্রিয়জনকে উপহার দেওয়ার জন্য বিশেষ প্যাকেজিংসহ সাজানো গয়নার সেট।",
    image: "/collections/gift-set.jpg",
    onHome: false,
  },
];

export interface BudgetRange {
  slug: string;
  label: string;
  min: number;
  max: number | null;
  note: string;
}

/** ডেমো প্রাইস ক্যাটাগরি—বাজারের বর্তমান স্বর্ণমূল্যের দাবি নয় */
export const budgetRanges: BudgetRange[] = [
  {
    slug: "under-1000",
    label: "৳১,০০০-এর মধ্যে",
    min: 0,
    max: 1000,
    note: "হালকা ও দৈনন্দিন",
  },
  {
    slug: "1000-3000",
    label: "৳১,০০০ – ৳৩,০০০",
    min: 1000,
    max: 3000,
    note: "সবচেয়ে জনপ্রিয়",
  },
  {
    slug: "3000-5000",
    label: "৳৩,০০০ – ৳৫,০০০",
    min: 3000,
    max: 5000,
    note: "উপহারের জন্য",
  },
  {
    slug: "5000-10000",
    label: "৳৫,০০০ – ৳১০,০০০",
    min: 5000,
    max: 10000,
    note: "বিশেষ দিনের",
  },
  {
    slug: "above-10000",
    label: "৳১০,০০০+",
    min: 10000,
    max: null,
    note: "প্রিমিয়াম ও ব্রাইডাল",
  },
];

/** সম্পূর্ণ সেট সেকশনের জন্য */
export interface SetHighlight {
  title: string;
  subtitle: string;
  href: string;
  image: string;
}

export const setHighlights: SetHighlight[] = [
  {
    title: "নেকলেস + ইয়াররিং",
    subtitle: "মিলিয়ে নেওয়া সম্পূর্ণ সাজ",
    href: "/category/set",
    image: "/sets/necklace-earring.jpg",
  },
  {
    title: "রিং + ব্রেসলেট",
    subtitle: "হাতের জন্য নিখুঁত জুটি",
    href: "/category/set",
    image: "/sets/ring-bracelet.jpg",
  },
  {
    title: "ব্রাইডাল সেট",
    subtitle: "বিয়ের দিনের পূর্ণাঙ্গ সংগ্রহ",
    href: "/collection/bridal",
    image: "/sets/bridal-set.jpg",
  },
  {
    title: "গিফট সেট",
    subtitle: "উপহার প্যাকেজিংসহ",
    href: "/collection/gift-set",
    image: "/sets/gift-set.jpg",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function getBudgetRange(slug: string): BudgetRange | undefined {
  return budgetRanges.find((range) => range.slug === slug);
}
