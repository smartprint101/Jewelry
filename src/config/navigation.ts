export interface NavItem {
  label: string;
  href: string;
}

/** ডেস্কটপ প্রধান মেনু */
export const mainNav: NavItem[] = [
  { label: "হোম", href: "/" },
  { label: "গয়না", href: "/shop" },
  { label: "নতুন কালেকশন", href: "/collection/new-arrival" },
  { label: "ব্রাইডাল", href: "/collection/bridal" },
  { label: "অফার", href: "/offers" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "যোগাযোগ", href: "/contact" },
];

/** ফুটার — দ্রুত লিংক */
export const quickLinks: NavItem[] = [
  { label: "হোম", href: "/" },
  { label: "সকল গয়না", href: "/shop" },
  { label: "নতুন কালেকশন", href: "/collection/new-arrival" },
  { label: "ব্রাইডাল", href: "/collection/bridal" },
  { label: "অফার", href: "/offers" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "যোগাযোগ", href: "/contact" },
];

/** ফুটার — সহায়তা */
export const supportLinks: NavItem[] = [
  { label: "FAQ", href: "/faq" },
  { label: "ডেলিভারি", href: "/info/delivery" },
  { label: "রিটার্ন", href: "/info/returns" },
  { label: "ওয়ারেন্টি", href: "/info/warranty" },
  { label: "গয়নার যত্ন", href: "/info/jewelry-care" },
];
