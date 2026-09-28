import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { budgetRanges } from "@/data/collections";
import { products } from "@/data/products";
import { toBnDigits } from "@/lib/format";

function countInRange(min: number, max: number | null): number {
  return products.filter(
    (product) => product.price >= min && (max === null || product.price < max),
  ).length;
}

export function BudgetSection() {
  return (
    <section className="bg-cream/60 py-12 md:py-16">
      <div className="container-x">
        <SectionHeading
          eyebrow="বাজেট"
          title="বাজেট অনুযায়ী গয়না"
          description="আপনার পছন্দের দামের সীমা বেছে নিন—এগুলো ডেমো প্রাইস ক্যাটাগরি, বাজারের বর্তমান স্বর্ণমূল্যের দাবি নয়।"
        />

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {budgetRanges.map((range) => (
            <li key={range.slug}>
              <Link
                href={`/shop?budget=${range.slug}`}
                className="group flex h-full flex-col justify-between gap-4 rounded-sm border border-sand bg-ivory p-4 transition hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white hover:shadow-[var(--shadow-soft)] md:p-5"
              >
                <span>
                  <span className="block font-bangla-serif text-[15px] font-semibold text-ink md:text-[17px]">
                    {range.label}
                  </span>
                  <span className="mt-1 block text-[11.5px] text-muted">{range.note}</span>
                </span>
                <span className="flex items-center justify-between text-[12px] text-ink-soft">
                  {toBnDigits(countInRange(range.min, range.max))}টি পণ্য
                  <Icon
                    name="arrow-right"
                    size={15}
                    className="text-gold transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
