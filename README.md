# AURELIA — প্রিমিয়াম জুয়েলারি ডেমো ওয়েবসাইট

**সৌন্দর্যের সাথে, স্মৃতির বন্ধন**

বাংলাদেশি জুয়েলারি ব্যবসার জন্য তৈরি একটি সম্পূর্ণ ই-কমার্স ডেমো ওয়েবসাইট।
ডিজাইন, কনটেন্ট ও ডেভেলপমেন্ট — **CodePixel Web**।

> এটি একটি ডেমো প্রজেক্ট। সকল ব্র্যান্ড, পণ্য, মূল্য, রিভিউ ও অর্ডার কাল্পনিক।
> কোনো পেমেন্ট গেটওয়ে, ব্যাকএন্ড বা কুরিয়ার ইন্টিগ্রেশন যুক্ত নেই।

---

## প্রযুক্তি

| বিষয়        | ব্যবহৃত প্রযুক্তি                                  |
| ----------- | -------------------------------------------------- |
| ফ্রেমওয়ার্ক | Next.js 16 (App Router) + React 19                 |
| ভাষা        | TypeScript                                          |
| স্টাইল      | Tailwind CSS v4 (`@theme` টোকেন, কোনো UI লাইব্রেরি নেই) |
| ফন্ট        | Hind Siliguri, Noto Serif Bengali, Cormorant Garamond (self-hosted) |
| স্টেট       | React Context + `localStorage` (কার্ট, উইশলিস্ট, অর্ডার) |
| ইমেজ        | `next/image` (AVIF/WebP)                            |
| ডিপ্লয়      | Vercel-ready (`npm run build`)                      |

## চালু করার নিয়ম

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # প্রোডাকশন বিল্ড
```

## পেজসমূহ

| রুট                  | বিবরণ                                                        |
| -------------------- | ------------------------------------------------------------ |
| `/`                  | হোম — হিরো, ক্যাটাগরি, নতুন কালেকশন, বেস্ট সেলার, ব্রাইডাল, সেট, বাজেট, যত্ন, রিভিউ, FAQ |
| `/shop`              | সব পণ্য — ফিল্টার, সার্চ ও সর্টিংসহ                          |
| `/category/[slug]`   | ক্যাটাগরি পেজ (রিং, নেকলেস, ইয়াররিং, …)                      |
| `/collection/[slug]` | কালেকশন পেজ (নতুন, বেস্ট সেলার, ব্রাইডাল, …)                 |
| `/product/[slug]`    | প্রোডাক্ট ডিটেইল — গ্যালারি, ভ্যারিয়েন্ট, সাইজ গাইড, ট্যাব, রিভিউ |
| `/offers`            | ছাড়ে পাওয়া পণ্য                                              |
| `/wishlist`          | উইশলিস্ট                                                      |
| `/cart`              | কার্ট                                                         |
| `/checkout`          | গেস্ট চেকআউট (ক্যাশ অন ডেলিভারি)                              |
| `/order/[id]`        | অর্ডার কনফার্মেশন                                             |
| `/about`, `/contact` | আমাদের সম্পর্কে, যোগাযোগ                                      |
| `/faq`, `/info/*`    | সাধারণ প্রশ্নোত্তর, ডেলিভারি, রিটার্ন, ওয়ারেন্টি, গয়নার যত্ন |

## ফোল্ডার কাঠামো

```
src/
├─ app/           রুট ও পেজ (App Router)
├─ components/    layout / home / product / shop / cart / wishlist / ui
├─ config/        site.ts, whatsapp.ts, navigation.ts   ← কেন্দ্রীয় কনফিগ
├─ data/          products, categories, collections, reviews, faqs, info, locations
├─ lib/           format (বাংলা সংখ্যা/মূল্য), filters, search, orders, utils
├─ store/         cart / wishlist / toast context
└─ types/         শেয়ারড টাইপ
assets/source/    ডেমো ইমেজের মূল ফাইল
scripts/          derive-images.mjs — ক্যাটালগ ইমেজ জেনারেটর
```

## কনফিগারেশন (একবার বদলালেই সব জায়গায় আপডেট)

- `src/config/site.ts` — নাম, ট্যাগলাইন, যোগাযোগ, ডেলিভারি চার্জ, নীতিমালা
- `src/config/whatsapp.ts` — WhatsApp নম্বর ও CTA (ফ্লোটিং বাটনসহ সব লিংক এখান থেকেই আসে)
- `src/config/navigation.ts` — হেডার ও ফুটার মেনু
- `src/data/products.ts` — পণ্যের তালিকা (ছবি, দাম, স্টক, স্পেসিফিকেশন, ভ্যারিয়েন্ট)

## ছবি

`public/` এর সব ক্যাটালগ ইমেজ `assets/source/` এর মূল ছবি থেকে
`scripts/derive-images.mjs` (sharp) দিয়ে তৈরি — ক্রপ, জুম ও টোন পরিবর্তন করে।

```bash
node scripts/derive-images.mjs
```

প্রকৃত প্রজেক্টে `public/products/<slug>.jpg`, `-2.jpg`, `-3.jpg` ফাইলগুলোর
জায়গায় আসল পণ্যের ছবি বসিয়ে দিলেই হবে — কোডে কোনো পরিবর্তন লাগবে না।
