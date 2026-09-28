"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductRail } from "@/components/product/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getFeaturedProducts } from "@/data/products";
import { formatPrice, toBnDigits } from "@/lib/format";
import { useCart } from "@/store/cart-context";
import { useToast } from "@/store/toast-context";

export function CartView() {
  const { items, subtotal, hydrated, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  const suggestions = getFeaturedProducts(8);

  if (!hydrated) {
    return (
      <div className="container-x py-16 text-center text-sm text-muted">কার্ট লোড হচ্ছে…</div>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <EmptyState
          icon="bag"
          title="আপনার কার্ট এখনো খালি"
          description="পছন্দের গয়না কার্টে যোগ করলে এখানে দেখতে পাবেন। আমাদের নতুন কালেকশন দিয়ে শুরু করতে পারেন।"
          actionLabel="কালেকশন দেখুন"
          actionHref="/shop"
          secondaryLabel="নতুন কালেকশন"
          secondaryHref="/collection/new-arrival"
        />
        <section className="container-x pb-14">
          <SectionHeading
            eyebrow="জনপ্রিয়"
            title="যেগুলো সবাই পছন্দ করছেন"
            href="/collection/best-seller"
          />
          <ProductRail products={suggestions} />
        </section>
      </>
    );
  }

  const freeDeliveryGap = siteConfig.delivery.freeDeliveryAbove - subtotal;

  return (
    <div className="container-x py-7 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:gap-8">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-ink">
              কার্টে {toBnDigits(items.length)}টি পণ্য
            </h2>
            <button
              type="button"
              onClick={() => {
                clearCart();
                toast("কার্ট খালি করা হয়েছে।", "default");
              }}
              className="inline-flex items-center gap-1.5 text-[12.5px] text-muted transition hover:text-maroon"
            >
              <Icon name="trash" size={14} />
              কার্ট খালি করুন
            </button>
          </div>

          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.key}
                className="flex gap-3 rounded-sm border border-line bg-white p-3 md:gap-4 md:p-4"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="relative size-[88px] shrink-0 overflow-hidden rounded-sm border border-line bg-ivory-deep md:size-[112px]"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/product/${item.slug}`}
                        className="line-clamp-2-bn text-[14px] font-medium leading-snug text-ink transition hover:text-gold md:text-[15px]"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-[11.5px] text-muted">
                        SKU: {item.sku}
                        {item.variant && ` • ${item.variant}`}
                        {item.size && ` • সাইজ ${toBnDigits(item.size)}`}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`${item.name} কার্ট থেকে সরান`}
                      onClick={() => {
                        removeItem(item.key);
                        toast("পণ্যটি কার্ট থেকে সরানো হয়েছে।", "default");
                      }}
                      className="grid size-8 shrink-0 place-items-center rounded-sm text-muted transition hover:bg-maroon-soft hover:text-maroon"
                    >
                      <Icon name="trash" size={15} />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(value) => updateQuantity(item.key, value)}
                      max={Math.max(item.maxStock, 1)}
                      size="sm"
                    />
                    <div className="text-right">
                      <p className="text-[15px] font-semibold text-ink">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[11.5px] text-muted">
                          প্রতি পিস {formatPrice(item.price)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink transition hover:text-gold"
            >
              <Icon name="chevron-left" size={15} />
              আরও গয়না দেখুন
            </Link>
            <p className="text-[12px] text-muted">সব মূল্য বাংলাদেশি টাকায় (৳)</p>
          </div>
        </div>

        {/* সারাংশ */}
        <aside className="lg:sticky lg:top-[100px] lg:self-start">
          <div className="rounded-sm border border-line bg-white p-5">
            <h2 className="text-[16px] font-semibold text-ink">অর্ডার সারাংশ</h2>

            <dl className="mt-4 space-y-2.5 text-[13.5px]">
              <div className="flex items-center justify-between">
                <dt className="text-muted">সাবটোটাল</dt>
                <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted">ডেলিভারি চার্জ</dt>
                <dd className="text-ink-soft">
                  ৳{toBnDigits(siteConfig.delivery.insideDhaka)} – ৳
                  {toBnDigits(siteConfig.delivery.outsideDhaka)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-2.5 text-[16px]">
                <dt className="font-semibold text-ink">সর্বমোট</dt>
                <dd className="font-semibold text-ink">{formatPrice(subtotal)}+</dd>
              </div>
            </dl>

            <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
              ঠিকানা অনুযায়ী ডেলিভারি চার্জ চেকআউট পেজে যোগ হবে।
            </p>

            {freeDeliveryGap > 0 ? (
              <p className="mt-3 rounded-sm bg-gold-tint px-3 py-2.5 text-[12px] text-ink-soft">
                আর {formatPrice(freeDeliveryGap)} যোগ করলেই ডেলিভারি ফ্রি (ডেমো অফার)।
              </p>
            ) : (
              <p className="mt-3 flex items-center gap-1.5 rounded-sm bg-leaf-soft px-3 py-2.5 text-[12px] text-leaf">
                <Icon name="check-circle" size={14} />
                আপনি ফ্রি ডেলিভারির জন্য যোগ্য হয়েছেন।
              </p>
            )}

            <ButtonLink href="/checkout" size="lg" fullWidth className="mt-4">
              চেকআউটে যান
            </ButtonLink>

            <ul className="mt-4 space-y-2 text-[12.5px] text-muted">
              <li className="flex items-center gap-2">
                <Icon name="shield" size={15} className="text-gold" />
                ক্যাশ অন ডেলিভারি—পণ্য হাতে পেয়ে মূল্য পরিশোধ
              </li>
              <li className="flex items-center gap-2">
                <Icon name="truck" size={15} className="text-gold" />
                ঢাকায় {siteConfig.delivery.insideDhakaTime}, বাইরে{" "}
                {siteConfig.delivery.outsideDhakaTime}
              </li>
              <li className="flex items-center gap-2">
                <Icon name="lock" size={15} className="text-gold" />
                আপনার তথ্য শুধুমাত্র ডেলিভারির জন্য ব্যবহৃত হয়
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-12">
        <SectionHeading
          eyebrow="সাথে মানাবে"
          title="এগুলোও দেখে নিতে পারেন"
          href="/shop"
        />
        <ProductRail products={suggestions} />
      </section>
    </div>
  );
}
