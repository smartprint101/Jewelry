import type { CategorySlug, MaterialSlug } from "@/types";

export interface Category {
  slug: CategorySlug;
  name: string;
  nameEn: string;
  description: string;
  image: string;
  /** হোমপেজের ক্যাটাগরি স্লাইডারে দেখানো হবে কি না */
  featured: boolean;
}

export const categories: Category[] = [
  {
    slug: "ring",
    name: "রিং",
    nameEn: "Ring",
    description:
      "প্রতিদিনের সাধারণ ডিজাইন থেকে বিশেষ দিনের স্টোন সেট রিং—আপনার আঙুলের জন্য নিখুঁত মাপে।",
    image: "/categories/ring.jpg",
    featured: true,
  },
  {
    slug: "necklace",
    name: "নেকলেস",
    nameEn: "Necklace",
    description:
      "হালকা চেইন নেকলেস থেকে বিয়ের ভারী ডিজাইন—প্রতিটি সাজের জন্য আলাদা সংগ্রহ।",
    image: "/categories/necklace.jpg",
    featured: true,
  },
  {
    slug: "earring",
    name: "ইয়াররিং",
    nameEn: "Earring",
    description: "ঝুমকা, স্টাড, হুপ ও ড্রপ—সব ধরনের কানের গয়না এক জায়গায়।",
    image: "/categories/earring.jpg",
    featured: true,
  },
  {
    slug: "bracelet",
    name: "ব্রেসলেট",
    nameEn: "Bracelet",
    description: "হাতের সৌন্দর্যে এক চিলতে আভিজাত্য—চেইন, কাফ ও স্টোন ব্রেসলেট।",
    image: "/categories/bracelet.jpg",
    featured: true,
  },
  {
    slug: "bangle",
    name: "চুড়ি",
    nameEn: "Bangle",
    description: "ঐতিহ্য আর আধুনিকতার মিশেলে সাজানো চুড়ি ও কাদা বেঙ্গলের সংগ্রহ।",
    image: "/categories/bangle.jpg",
    featured: true,
  },
  {
    slug: "pendant",
    name: "পেনডেন্ট",
    nameEn: "Pendant",
    description: "ছোট অথচ অর্থবহ—চেইনসহ পেনডেন্ট ও পেনডেন্ট সেট।",
    image: "/categories/pendant.jpg",
    featured: true,
  },
  {
    slug: "nose-pin",
    name: "নোজ পিন",
    nameEn: "Nose Pin",
    description: "হালকা ওজনের আরামদায়ক নোজ পিন—প্রতিদিনের ব্যবহারের জন্য।",
    image: "/categories/nose-pin.jpg",
    featured: true,
  },
  {
    slug: "anklet",
    name: "অ্যাঙ্কলেট",
    nameEn: "Anklet",
    description: "পায়ের নূপুর ও অ্যাঙ্কলেট—ঐতিহ্যবাহী ও মিনিমাল দুই ধরনেই।",
    image: "/categories/anklet.jpg",
    featured: true,
  },
  {
    slug: "mens",
    name: "মেনস জুয়েলারি",
    nameEn: "Mens Jewelry",
    description: "পুরুষদের জন্য রিং, চেইন ও ব্রেসলেট—সংযত অথচ আকর্ষণীয় ডিজাইন।",
    image: "/categories/mens.jpg",
    featured: true,
  },
  {
    slug: "couple",
    name: "কাপল জুয়েলারি",
    nameEn: "Couple Jewelry",
    description: "দুজনের জন্য মিলিয়ে নেওয়া রিং, ব্রেসলেট ও পেনডেন্ট জোড়া।",
    image: "/categories/couple.jpg",
    featured: true,
  },
  {
    slug: "set",
    name: "সম্পূর্ণ সেট",
    nameEn: "Jewelry Set",
    description:
      "নেকলেস + ইয়াররিং, রিং + ব্রেসলেট কিংবা পূর্ণাঙ্গ ব্রাইডাল সেট—একসাথে সম্পূর্ণ সাজ।",
    image: "/categories/set.jpg",
    featured: true,
  },
];

export interface Material {
  slug: MaterialSlug;
  name: string;
  nameEn: string;
  note: string;
}

export const materials: Material[] = [
  { slug: "gold", name: "গোল্ড", nameEn: "Gold", note: "২১K / ২২K গোল্ড" },
  {
    slug: "diamond",
    name: "ডায়মন্ড",
    nameEn: "Diamond",
    note: "সার্টিফিকেটসহ ডায়মন্ড",
  },
  { slug: "silver", name: "সিলভার", nameEn: "Silver", note: "৯২৫ স্টার্লিং সিলভার" },
  {
    slug: "gold-plated",
    name: "গোল্ড-প্লেটেড",
    nameEn: "Gold-Plated",
    note: "১৮K গোল্ড প্লেটিং",
  },
  { slug: "pearl", name: "পার্ল", nameEn: "Pearl", note: "ফ্রেশওয়াটার পার্ল" },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getMaterial(slug: string): Material | undefined {
  return materials.find((material) => material.slug === slug);
}

export function materialName(slug: MaterialSlug): string {
  return getMaterial(slug)?.name ?? slug;
}

export function categoryName(slug: CategorySlug): string {
  return getCategory(slug)?.name ?? slug;
}
