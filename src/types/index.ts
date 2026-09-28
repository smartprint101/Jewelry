export type MaterialSlug =
  | "gold"
  | "diamond"
  | "silver"
  | "gold-plated"
  | "pearl";

export type CategorySlug =
  | "ring"
  | "necklace"
  | "earring"
  | "bracelet"
  | "bangle"
  | "pendant"
  | "nose-pin"
  | "anklet"
  | "mens"
  | "couple"
  | "set";

export type CollectionSlug =
  | "new-arrival"
  | "best-seller"
  | "bridal"
  | "everyday"
  | "occasion"
  | "gift-set";

export type SizeType = "ring" | "bangle" | "chain" | "bracelet" | "anklet";

export interface ProductVariant {
  /** ভ্যারিয়েন্ট আইডি (URL/state-এ ব্যবহৃত) */
  id: string;
  /** গ্রাহককে দেখানো নাম, যেমন: গোল্ড টোন */
  name: string;
  /** সোয়াচের রঙ */
  swatch: string;
  /** ভ্যারিয়েন্ট নির্বাচন করলে যে ছবিটি দেখানো হবে (ঐচ্ছিক) */
  image?: string;
}

export interface ProductSizeOption {
  type: SizeType;
  /** যেমন: রিং সাইজ নির্বাচন করুন */
  label: string;
  options: string[];
  /** সাইজ গাইড দেখাবে কি না */
  guide?: boolean;
  unit?: string;
}

export interface ProductSpecs {
  metal?: string;
  karat?: string;
  weight?: string;
  stone?: string;
  stoneType?: string;
  color?: string;
  dimensions?: string;
  chainLength?: string;
  braceletSize?: string;
  certificate?: string;
  warranty?: string;
  polish?: string;
  closure?: string;
  pieces?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** সার্চে সহায়তার জন্য ইংরেজি নাম */
  nameEn: string;
  sku: string;
  category: CategorySlug;
  materials: MaterialSlug[];
  collections: CollectionSlug[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  variants?: ProductVariant[];
  size?: ProductSizeOption;
  specs: ProductSpecs;
  shortDescription: string;
  description: string;
  highlights: string[];
  tags: string[];
  /** হোমপেজে বিশেষভাবে দেখানোর জন্য */
  featured?: boolean;
}

export interface CartItem {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  variant?: string;
  size?: string;
  sku: string;
  maxStock: number;
}

export interface CustomerOrder {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  address: string;
  division: string;
  district: string;
  area: string;
  note?: string;
  deliveryZone: "inside" | "outside";
  deliveryCharge: number;
  subtotal: number;
  total: number;
  items: CartItem[];
  paymentMethod: string;
  status: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  productSlug: string;
  productName: string;
  text: string;
  date: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  /** কোন পেজে দেখানো হবে */
  topics: Array<"home" | "delivery" | "product" | "order" | "care">;
}
