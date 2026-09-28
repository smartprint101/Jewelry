/**
 * কেন্দ্রীয় WhatsApp কনফিগারেশন।
 * নম্বর বা CTA বদলাতে হলে শুধুমাত্র এই ফাইলটি পরিবর্তন করুন—
 * সাইটের সব WhatsApp বাটন/লিংক স্বয়ংক্রিয়ভাবে আপডেট হবে।
 */
const number = "8801876892958";
const displayNumber = "01876892958";
const cta = "এই ধরনের সাইট তৈরি করতে এখনি মেসেজ দিন।";
const defaultMessage =
  "আসসালামু আলাইকুম, আমি AURELIA ডেমো ওয়েবসাইটটি দেখে যোগাযোগ করছি। এই ধরনের একটি ওয়েবসাইট তৈরি করতে চাই।";

export function whatsappLink(message: string = defaultMessage): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** নির্দিষ্ট পণ্য নিয়ে WhatsApp-এ অর্ডার/জিজ্ঞাসার লিংক */
export function whatsappProductLink(productName: string, sku: string): string {
  return whatsappLink(
    `আসসালামু আলাইকুম, আমি এই পণ্যটি সম্পর্কে জানতে চাই।\nপণ্য: ${productName}\nSKU: ${sku}`,
  );
}

export const whatsappConfig = {
  number,
  displayNumber,
  cta,
  shortCta: "WhatsApp-এ মেসেজ দিন",
  defaultMessage,
  link: whatsappLink(),
  callLink: `tel:+${number}`,
} as const;

export type WhatsAppConfig = typeof whatsappConfig;
