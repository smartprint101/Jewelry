import type { Metadata } from "next";
import Link from "next/link";
import { ProductRail } from "@/components/product/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "পেজটি পাওয়া যায়নি",
  robots: { index: false, follow: true },
};

const shortcuts = [
  { label: "সকল গয়না", href: "/shop" },
  { label: "নতুন কালেকশন", href: "/collection/new-arrival" },
  { label: "ব্রাইডাল", href: "/collection/bridal" },
  { label: "অফার", href: "/offers" },
  { label: "যোগাযোগ", href: "/contact" },
];

export default function NotFound() {
  const suggestions = getFeaturedProducts(8);

  return (
    <>
      <section className="border-b border-line bg-ivory-deep">
        <div className="container-x flex flex-col items-center py-16 text-center md:py-24">
          <span className="font-display text-[72px] leading-none text-gold md:text-[104px]">
            404
          </span>
          <h1 className="mt-3 text-[22px] leading-snug text-ink md:text-[30px]">
            দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="mt-2.5 max-w-md text-[13.5px] leading-relaxed text-muted md:text-[15px]">
            আপনি যে লিংকটিতে গিয়েছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে অথবা ঠিকানায় ভুল আছে। নিচ থেকে
            আবার শুরু করতে পারেন।
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <ButtonLink href="/" size="md">
              হোমে ফিরে যান
            </ButtonLink>
            <ButtonLink href="/shop" variant="outline" size="md">
              সব গয়না দেখুন
            </ButtonLink>
          </div>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {shortcuts.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-sand bg-white px-3.5 py-1.5 text-[12.5px] text-ink-soft transition hover:border-gold hover:text-gold"
                >
                  <Icon name="chevron-right" size={13} className="text-gold" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-10 md:py-14">
        <SectionHeading
          eyebrow="জনপ্রিয়"
          title="এগুলো দেখে নিতে পারেন"
          href="/collection/best-seller"
        />
        <ProductRail products={suggestions} />
      </section>
    </>
  );
}
