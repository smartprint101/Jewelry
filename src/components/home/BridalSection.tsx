import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

const bridalItems = [
  "ব্রাইডাল নেকলেস",
  "ইয়াররিং",
  "ব্রেসলেট",
  "রিং",
  "সম্পূর্ণ ব্রাইডাল সেট",
];

export function BridalSection({ products }: { products: Product[] }) {
  return (
    <section className="bg-ink text-ivory" aria-labelledby="bridal-heading">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <Image
            src="/brand/bridal.jpg"
            alt="ব্রাইডাল গয়না পরা একজন কনে — AURELIA ব্রাইডাল কালেকশন"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-[60%_center]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/60"
          />
        </div>

        <div className="flex items-center px-4 py-12 md:px-10 lg:px-14 lg:py-16">
          <Reveal className="w-full max-w-xl">
            <p className="eyebrow text-gold-light">ব্রাইডাল কালেকশন</p>
            <h2
              id="bridal-heading"
              className="mt-3 text-[24px] leading-tight text-ivory md:text-[34px]"
            >
              বিশেষ দিনের জন্য ব্রাইডাল কালেকশন
            </h2>
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-ivory/70">
              আপনার জীবনের সবচেয়ে স্মরণীয় মুহূর্তের জন্য বেছে নিন বিশেষভাবে সাজানো গয়নার
              সংগ্রহ।
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[13.5px] text-ivory/80">
              {bridalItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Icon name="check" size={14} className="shrink-0 text-gold-light" />
                  {item}
                </li>
              ))}
            </ul>

            {products.length > 0 && (
              <ul className="mt-8 grid grid-cols-3 gap-3">
                {products.slice(0, 3).map((product) => (
                  <li key={product.slug}>
                    <Link href={`/product/${product.slug}`} className="group block">
                      <span className="relative block aspect-square overflow-hidden rounded-sm border border-ivory/15">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 1023px) 30vw, 15vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </span>
                      <span className="mt-2 block truncate text-[12px] text-ivory/80 transition group-hover:text-gold-light">
                        {product.name}
                      </span>
                      <span className="block text-[12px] font-semibold text-gold-light">
                        {formatPrice(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8">
              <ButtonLink href="/collection/bridal" size="lg" className="w-full sm:w-auto">
                ব্রাইডাল কালেকশন দেখুন
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
