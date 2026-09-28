import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { categories, materials } from "@/data/categories";
import { countByCategory, countByMaterial } from "@/data/products";
import { toBnDigits } from "@/lib/format";

const materialSwatch: Record<string, string> = {
  gold: "linear-gradient(135deg,#e6c789,#a97c3f)",
  diamond: "linear-gradient(135deg,#f2f6f8,#cfd9e0)",
  silver: "linear-gradient(135deg,#eef0f2,#b8bec6)",
  "gold-plated": "linear-gradient(135deg,#f1dcae,#c69a4e)",
  pearl: "linear-gradient(135deg,#fdfaf3,#e6dbc6)",
};

export function CategorySection() {
  return (
    <section className="container-x py-12 md:py-16" aria-labelledby="category-heading">
      <SectionHeading
        eyebrow="ক্যাটাগরি"
        title="গয়নার ধরন অনুযায়ী দেখুন"
        description="রিং থেকে ব্রাইডাল সেট—প্রতিটি ক্যাটাগরিতে সাজানো আছে বাছাই করা ডিজাইন।"
        href="/shop"
        linkLabel="সকল গয়না"
      />

      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-6">
        {categories.map((category, index) => (
          <Reveal
            key={category.slug}
            delay={Math.min(index, 5) * 0.05}
            className="w-[116px] shrink-0 snap-start md:w-auto"
          >
            <Link href={`/category/${category.slug}`} className="group block">
              <span className="relative block aspect-[3/4] overflow-hidden rounded-t-[999px] border border-line bg-ivory-deep">
                <Image
                  src={category.image}
                  alt={`${category.name} কালেকশন`}
                  fill
                  sizes="(max-width: 767px) 116px, 16vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-t-[999px] ring-1 ring-inset ring-white/25 transition group-hover:ring-gold/40"
                />
              </span>
              <span className="mt-2.5 block text-center">
                <span className="block text-[12.5px] font-medium text-ink transition-colors group-hover:text-gold md:text-[14px]">
                  {category.name}
                </span>
                <span className="block text-[10.5px] text-muted md:text-[11.5px]">
                  {toBnDigits(countByCategory(category.slug))}টি ডিজাইন
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* ম্যাটেরিয়াল */}
      <div className="mt-10 rounded-sm border border-line bg-white/70 p-4 md:mt-12 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 id="category-heading" className="text-[16px] text-ink md:text-[18px]">
            ম্যাটেরিয়াল অনুযায়ী খুঁজুন
          </h3>
          <Link
            href="/shop"
            className="text-[12.5px] font-medium text-gold underline underline-offset-4"
          >
            সব ম্যাটেরিয়াল
          </Link>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {materials.map((material) => (
            <li key={material.slug}>
              <Link
                href={`/shop?material=${material.slug}`}
                className="group flex items-center gap-3 rounded-sm border border-line bg-ivory px-3 py-2.5 transition hover:border-gold/50 hover:bg-gold-tint/60"
              >
                <span
                  aria-hidden
                  className="size-7 shrink-0 rounded-full border border-black/5 shadow-inner"
                  style={{ background: materialSwatch[material.slug] }}
                />
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium text-ink">
                    {material.name}
                  </span>
                  <span className="block truncate text-[10.5px] text-muted">
                    {toBnDigits(countByMaterial(material.slug))}টি পণ্য • {material.note}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
