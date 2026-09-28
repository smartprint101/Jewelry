import type { Review } from "@/types";

/**
 * ডেমো রিভিউ (কাল্পনিক)।
 * বাস্তব কোনো গ্রাহকের মতামত নয়—শুধুমাত্র ডেমো উপস্থাপনার জন্য।
 */
export const reviews: Review[] = [
  {
    id: "r-01",
    name: "সাদিয়া আফরিন",
    location: "ধানমন্ডি, ঢাকা",
    rating: 5,
    productSlug: "nowshin-jhumka",
    productName: "নওশিন ঝুমকা",
    text: "ডিজাইনটা ছবির মতোই সুন্দর ছিল। প্যাকেজিংও খুব সুন্দর, উপহার দেওয়ার জন্য আলাদা করে কিছু করতে হয়নি।",
    date: "2026-09-12",
  },
  {
    id: "r-02",
    name: "তানজিলা হক",
    location: "চট্টগ্রাম",
    rating: 5,
    productSlug: "zara-pearl-earring",
    productName: "জারা পার্ল ইয়াররিং",
    text: "এত হালকা যে সারাদিন পরে থাকলেও কানে ব্যথা হয় না। দুই দিনেই ডেলিভারি পেয়েছি।",
    date: "2026-09-08",
  },
  {
    id: "r-03",
    name: "মাহমুদা খানম",
    location: "উত্তরা, ঢাকা",
    rating: 4,
    productSlug: "rajkonna-bridal-set",
    productName: "রাজকন্যা ব্রাইডাল সেট",
    text: "বোনের বিয়েতে নিয়েছিলাম। ছবিতে যেমন দেখেছি ঠিক তেমনই। শুধু নেকলেসটা একটু ভারী মনে হয়েছে প্রথমে।",
    date: "2026-08-29",
  },
  {
    id: "r-04",
    name: "রুবাইয়া ইসলাম",
    location: "সিলেট",
    rating: 5,
    productSlug: "ruhi-pendant-set",
    productName: "রুহি পেনডেন্ট সেট",
    text: "দাম অনুযায়ী মান অনেক ভালো। কয়েক মাস ব্যবহারের পরেও রঙ একদম আগের মতোই আছে।",
    date: "2026-08-21",
  },
  {
    id: "r-05",
    name: "নুসরাত জাহান",
    location: "মিরপুর, ঢাকা",
    rating: 5,
    productSlug: "noor-gold-ring",
    productName: "নূর গোল্ড রিং",
    text: "রিং সাইজ নিয়ে দুশ্চিন্তায় ছিলাম। সাইজ গাইড দেখে অর্ডার করেছি, একদম ঠিকঠাক হয়েছে।",
    date: "2026-08-15",
  },
  {
    id: "r-06",
    name: "ফারহানা আক্তার",
    location: "রাজশাহী",
    rating: 4,
    productSlug: "shreya-bangle-set",
    productName: "শ্রেয়া চুড়ি সেট",
    text: "ঈদের জন্য নিয়েছিলাম, সবাই প্রশংসা করেছে। ডেলিভারি একদিন দেরি হয়েছিল, তবে জানিয়ে দেওয়া হয়েছিল।",
    date: "2026-08-03",
  },
  {
    id: "r-07",
    name: "ইমরান হোসেন",
    location: "খুলনা",
    rating: 5,
    productSlug: "mahir-mens-ring",
    productName: "মাহির মেনস রিং",
    text: "ছেলেদের রিংয়ের ভালো ডিজাইন সহজে পাওয়া যায় না। ফিনিশিং খুব পরিষ্কার, ওজনও ঠিক আছে।",
    date: "2026-07-27",
  },
  {
    id: "r-08",
    name: "সুমাইয়া রহমান",
    location: "গাজীপুর",
    rating: 5,
    productSlug: "onuvob-couple-ring",
    productName: "অনুভব কাপল রিং",
    text: "অ্যানিভার্সারিতে উপহার দিয়েছি। বক্সটা এত সুন্দর ছিল যে আলাদা করে গিফট র‍্যাপ লাগেনি।",
    date: "2026-07-19",
  },
  {
    id: "r-09",
    name: "তাহমিনা বেগম",
    location: "বরিশাল",
    rating: 4,
    productSlug: "rubaiya-pearl-necklace",
    productName: "রুবাইয়া পার্ল নেকলেস",
    text: "পার্লগুলো সমান আকারের, গাঁথুনি শক্ত। শাড়ির সাথে খুব ভালো মানিয়েছে।",
    date: "2026-07-05",
  },
  {
    id: "r-10",
    name: "আফসানা মিম",
    location: "ময়মনসিংহ",
    rating: 5,
    productSlug: "ananya-gold-nose-pin",
    productName: "অনন্যা গোল্ড নোজ পিন",
    text: "ছোট কিন্তু ঝলমলে। স্ক্রু টাইপ হওয়ায় খুলে পড়ার ভয় নেই—এটাই সবচেয়ে ভালো লেগেছে।",
    date: "2026-06-28",
  },
  {
    id: "r-11",
    name: "শারমিন সুলতানা",
    location: "নারায়ণগঞ্জ",
    rating: 5,
    productSlug: "suraiya-layered-necklace",
    productName: "সুরাইয়া লেয়ার্ড নেকলেস",
    text: "তিনটা চেইন আলাদা করে পরার ঝামেলা নেই। অফিসে সবাই জিজ্ঞেস করেছে কোথা থেকে নিয়েছি।",
    date: "2026-06-14",
  },
  {
    id: "r-12",
    name: "জান্নাতুল ফেরদৌস",
    location: "কুমিল্লা",
    rating: 5,
    productSlug: "payel-silver-anklet",
    productName: "পায়েল সিলভার অ্যাঙ্কলেট",
    text: "রুপার মান ভালো, ঘুঙুরের শব্দটাও মিষ্টি। ক্যাশ অন ডেলিভারিতে নিয়েছি, কোনো ঝামেলা হয়নি।",
    date: "2026-06-02",
  },
];

/** পণ্যভিত্তিক রিভিউ না থাকলে ব্যবহৃত সাধারণ ডেমো রিভিউ */
export const genericReviews: Omit<Review, "id" | "productSlug" | "productName">[] = [
  {
    name: "নাজমুন নাহার",
    location: "ঢাকা",
    rating: 5,
    text: "ছবির সাথে পুরোপুরি মিল আছে। ফিনিশিং পরিষ্কার, প্যাকেজিংও যত্ন করে করা হয়েছে।",
    date: "2026-09-02",
  },
  {
    name: "সাবরিনা আক্তার",
    location: "নরসিংদী",
    rating: 4,
    text: "দাম অনুযায়ী মান ভালো। ডেলিভারি সময়মতো পেয়েছি, ডেলিভারি ম্যান পণ্য দেখার সুযোগ দিয়েছেন।",
    date: "2026-08-18",
  },
  {
    name: "মেহেদী হাসান",
    location: "চট্টগ্রাম",
    rating: 5,
    text: "উপহার হিসেবে কিনেছিলাম, খুব পছন্দ হয়েছে। আবার অর্ডার করবো ইনশাআল্লাহ।",
    date: "2026-07-30",
  },
  {
    name: "ফারজানা ইয়াসমিন",
    location: "সিলেট",
    rating: 5,
    text: "কয়েক সপ্তাহ ব্যবহার করলাম, রঙ একদম ঠিক আছে। কাস্টমার সাপোর্টও দ্রুত রিপ্লাই দেয়।",
    date: "2026-07-11",
  },
];

export function getReviewsForProduct(slug: string): Review[] {
  return reviews.filter((review) => review.productSlug === slug);
}

export function getHomeReviews(limit = 6): Review[] {
  return reviews.slice(0, limit);
}

export function averageRating(): number {
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}
