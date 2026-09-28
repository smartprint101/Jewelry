import { whatsappConfig } from "@/config/whatsapp";

/**
 * AURELIA — কেন্দ্রীয় সাইট কনফিগারেশন
 * সাইটের সব সাধারণ তথ্য এখানে একবার পরিবর্তন করলেই পুরো ওয়েবসাইটে আপডেট হবে।
 */
export const siteConfig = {
  name: "AURELIA",
  nameBn: "অরেলিয়া",
  tagline: "সৌন্দর্যের সাথে, স্মৃতির বন্ধন",
  shortDescription:
    "প্রতিদিনের সৌন্দর্য থেকে বিশেষ দিনের মুহূর্ত—আপনার জন্য বেছে নেওয়া অনন্য গয়নার সংগ্রহ।",
  description:
    "AURELIA একটি প্রিমিয়াম জুয়েলারি ব্র্যান্ড। Gold, Diamond, Silver, Gold-Plated ও Pearl গয়নার নির্বাচিত সংগ্রহ—দৈনন্দিন ব্যবহার থেকে বিয়ে ও বিশেষ দিনের জন্য।",
  url: "https://aurelia-demo.vercel.app",
  locale: "bn_BD",
  currency: "৳",

  contact: {
    phone: "01876892958",
    phoneIntl: "+8801876892958",
    email: "hello@aurelia.demo",
    addressLine: "লেভেল ৪, বিজয় টাওয়ার, গুলশান এভিনিউ, ঢাকা ১২১২",
    addressShort: "গুলশান, ঢাকা",
    hours: "শনি–বৃহস্পতি: সকাল ১০টা – রাত ৮টা",
    hoursNote: "শুক্রবার বন্ধ",
  },

  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },

  delivery: {
    insideDhaka: 70,
    outsideDhaka: 130,
    insideDhakaLabel: "ঢাকার ভিতরে",
    outsideDhakaLabel: "ঢাকার বাইরে",
    insideDhakaTime: "২৪–৪৮ ঘণ্টা",
    outsideDhakaTime: "২–৪ কার্যদিবস",
    freeDeliveryAbove: 8000,
  },

  policy: {
    exchangeDays: 3,
    warrantyMonths: 6,
    codLabel: "ক্যাশ অন ডেলিভারি",
  },

  /** ডেমো সাইট—সৎ ও স্বচ্ছ বার্তা */
  demoNotice:
    "এটি CodePixel Web-এর তৈরি একটি ডেমো ওয়েবসাইট। সকল ব্র্যান্ড, পণ্য, মূল্য ও রিভিউ কাল্পনিক।",

  agency: {
    name: "CodePixel Web",
    credit: "Website Demo by CodePixel Web",
    url: whatsappConfig.link,
  },

  whatsapp: whatsappConfig,
} as const;

export type SiteConfig = typeof siteConfig;
