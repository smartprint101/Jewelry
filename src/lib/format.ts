const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** ইংরেজি সংখ্যা → বাংলা সংখ্যা */
export function toBnDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/** বাংলা সংখ্যা → ইংরেজি সংখ্যা (ফর্ম ইনপুটের জন্য) */
export function toEnDigits(value: string): string {
  return value.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

/** ভারতীয়/বাংলাদেশি স্টাইলে গ্রুপিং: ১২,৩৪,৫৬৭ */
function groupIndian(input: number): string {
  const n = Math.round(Math.abs(input)).toString();
  if (n.length <= 3) return n;
  const last3 = n.slice(-3);
  const rest = n.slice(0, -3);
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
}

/** মূল্য ফরম্যাট: ৳১২,৫০০ */
export function formatPrice(amount: number, withSymbol = true): string {
  const formatted = toBnDigits(groupIndian(amount));
  const sign = amount < 0 ? "-" : "";
  return `${sign}${withSymbol ? "৳" : ""}${formatted}`;
}

/** ডিসকাউন্ট শতাংশ নির্ণয় */
export function discountPercent(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

/** রেটিং: ৪.৮ */
export function formatRating(rating: number): string {
  return toBnDigits(rating.toFixed(1));
}

export function formatCount(count: number): string {
  return toBnDigits(count);
}

/** ডেমো অর্ডার আইডি: #AUR-10248 */
export function generateOrderId(): string {
  const n = 10000 + Math.floor(Math.random() * 89999);
  return `AUR-${n}`;
}

/** তারিখ: ২৮ সেপ্টেম্বর ২০২৬ */
const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

export function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) return "";
  return `${toBnDigits(date.getDate())} ${BN_MONTHS[date.getMonth()]} ${toBnDigits(
    date.getFullYear(),
  )}`;
}

/** বাংলাদেশি মোবাইল নম্বর যাচাই (01XXXXXXXXX) */
export function isValidBdPhone(value: string): boolean {
  const normalized = toEnDigits(value).replace(/[\s-]/g, "");
  return /^(?:\+?88)?01[3-9]\d{8}$/.test(normalized);
}
