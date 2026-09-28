import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

const types: { label: string; note: string; href: string; icon: IconName }[] = [
  {
    label: "দৈনন্দিন গয়না",
    note: "হালকা ও আরামদায়ক",
    href: "/collection/everyday",
    icon: "sparkle",
  },
  {
    label: "বিশেষ দিনের গয়না",
    note: "দাওয়াত ও উৎসব",
    href: "/collection/occasion",
    icon: "star",
  },
  {
    label: "ব্রাইডাল",
    note: "বিয়ের সম্পূর্ণ সাজ",
    href: "/collection/bridal",
    icon: "certificate",
  },
  {
    label: "উপহার",
    note: "গিফট প্যাকেজিংসহ",
    href: "/collection/gift-set",
    icon: "gift",
  },
  {
    label: "মেনস জুয়েলারি",
    note: "পুরুষদের জন্য",
    href: "/category/mens",
    icon: "shield",
  },
  {
    label: "কাপল জুয়েলারি",
    note: "দুজনের জন্য জোড়া",
    href: "/category/couple",
    icon: "heart",
  },
];

export function ShopByType() {
  return (
    <section className="container-x py-12 md:py-16">
      <SectionHeading
        eyebrow="উপলক্ষ অনুযায়ী"
        title="কোন উপলক্ষের জন্য খুঁজছেন?"
        description="প্রতিদিনের সাজ, উৎসব, বিয়ে কিংবা উপহার—উপলক্ষ বেছে নিলে পছন্দ করা সহজ হয়।"
        align="center"
      />

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
        {types.map((type) => (
          <li key={type.href}>
            <Link
              href={type.href}
              className="group flex h-full flex-col items-center gap-2 rounded-sm border border-line bg-white px-3 py-5 text-center transition hover:-translate-y-0.5 hover:border-gold/45 hover:shadow-[var(--shadow-soft)]"
            >
              <span className="grid size-11 place-items-center rounded-full border border-gold/20 bg-gold-tint text-gold transition group-hover:bg-gold group-hover:text-white">
                <Icon name={type.icon} size={19} />
              </span>
              <span className="text-[13px] font-medium text-ink md:text-[14px]">
                {type.label}
              </span>
              <span className="text-[11px] text-muted">{type.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
