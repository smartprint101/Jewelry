"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductRail } from "@/components/product/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/config/whatsapp";
import { getFeaturedProducts } from "@/data/products";
import { formatDate, formatPrice, toBnDigits } from "@/lib/format";
import { getOrder } from "@/lib/orders";
import type { CustomerOrder } from "@/types";

export function OrderConfirmation({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [ready, setReady] = useState(false);
  const suggestions = getFeaturedProducts(8);

  useEffect(() => {
    // ডেমো অর্ডার ব্রাউজারের localStorage-এ থাকে, তাই মাউন্টের পর পড়া হয়
    /* eslint-disable react-hooks/set-state-in-effect */
    setOrder(getOrder(orderId));
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [orderId]);

  if (!ready) {
    return (
      <div className="container-x py-20 text-center text-sm text-muted">অর্ডারের তথ্য লোড হচ্ছে…</div>
    );
  }

  if (!order) {
    return (
      <EmptyState
        icon="box"
        title="এই অর্ডারটি খুঁজে পাওয়া যায়নি"
        description={`অর্ডার #${orderId} এই ব্রাউজারে সংরক্ষিত নেই। ডেমো অর্ডারগুলো শুধু আপনার নিজের ব্রাউজারে থাকে, তাই অন্য ডিভাইস বা ব্রাউজার থেকে দেখা যায় না।`}
        actionLabel="আবার কেনাকাটা করুন"
        actionHref="/shop"
        secondaryLabel="যোগাযোগ করুন"
        secondaryHref="/contact"
      />
    );
  }

  const estimated =
    order.deliveryZone === "inside"
      ? siteConfig.delivery.insideDhakaTime
      : siteConfig.delivery.outsideDhakaTime;

  const steps = [
    { label: "অর্ডার গ্রহণ", done: true },
    { label: "প্যাকেজিং", done: false },
    { label: "কুরিয়ারে হস্তান্তর", done: false },
    { label: "ডেলিভারি", done: false },
  ];

  return (
    <div className="container-x py-8 md:py-12">
      {/* সফল বার্তা */}
      <div className="mx-auto max-w-3xl rounded-sm border border-leaf/25 bg-leaf-soft p-6 text-center md:p-8">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-leaf text-white">
          <Icon name="check" size={28} />
        </span>
        <h1 className="mt-4 text-[21px] leading-snug text-ink md:text-[28px]">
          আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
        </h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft md:text-[15px]">
          ধন্যবাদ {order.name}! আমাদের একজন প্রতিনিধি শীঘ্রই {order.phone} নম্বরে কল করে অর্ডারটি
          নিশ্চিত করবেন।
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-sm border border-line bg-white px-4 py-2 font-mono text-[15px] font-semibold tracking-wide text-ink">
          <Icon name="box" size={16} className="text-gold" />#{order.id}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* অর্ডার বিবরণ */}
        <div className="space-y-5">
          <section className="rounded-sm border border-line bg-white p-5">
            <h2 className="text-[15px] font-semibold text-ink">অর্ডারের তথ্য</h2>
            <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {[
                ["অর্ডার আইডি", `#${order.id}`],
                ["অর্ডারের তারিখ", formatDate(order.createdAt)],
                ["গ্রাহকের নাম", order.name],
                ["মোবাইল নম্বর", order.phone],
                ["পেমেন্ট পদ্ধতি", `${order.paymentMethod} (COD)`],
                ["অর্ডার স্ট্যাটাস", order.status],
                [
                  "ডেলিভারি এলাকা",
                  order.deliveryZone === "inside"
                    ? siteConfig.delivery.insideDhakaLabel
                    : siteConfig.delivery.outsideDhakaLabel,
                ],
                ["সম্ভাব্য ডেলিভারি", estimated],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-line pb-2.5 last:border-0">
                  <dt className="text-[11.5px] uppercase tracking-wide text-muted">{label}</dt>
                  <dd className="mt-0.5 text-[13.5px] font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 rounded-sm bg-ivory-deep p-3.5">
              <p className="text-[11.5px] uppercase tracking-wide text-muted">ডেলিভারি ঠিকানা</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink">
                {order.address}, {order.area}, {order.district}, {order.division}
              </p>
              {order.note && (
                <p className="mt-2 text-[12.5px] text-muted">
                  <span className="font-medium text-ink-soft">অতিরিক্ত নির্দেশনা:</span> {order.note}
                </p>
              )}
            </div>
          </section>

          {/* স্ট্যাটাস টাইমলাইন */}
          <section className="rounded-sm border border-line bg-white p-5">
            <h2 className="text-[15px] font-semibold text-ink">অর্ডার প্রক্রিয়া</h2>
            <ol className="mt-4 grid gap-3 sm:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step.label} className="flex items-start gap-2.5 sm:block">
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-semibold ${
                      step.done ? "bg-leaf text-white" : "bg-cream text-muted"
                    }`}
                  >
                    {step.done ? <Icon name="check" size={14} /> : toBnDigits(index + 1)}
                  </span>
                  <span className="sm:mt-2 sm:block">
                    <span
                      className={`block text-[13px] font-medium ${
                        step.done ? "text-ink" : "text-muted"
                      }`}
                    >
                      {step.label}
                    </span>
                    {index === 0 && (
                      <span className="block text-[11.5px] text-muted">সম্পন্ন হয়েছে</span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-sm border border-line bg-white p-5">
            <h2 className="text-[15px] font-semibold text-ink">
              অর্ডারকৃত পণ্য ({toBnDigits(order.items.length)}টি)
            </h2>
            <ul className="mt-4 space-y-3">
              {order.items.map((item) => (
                <li key={item.key} className="flex gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-sm border border-line bg-ivory-deep">
                    <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <Link
                      href={`/product/${item.slug}`}
                      className="line-clamp-2-bn text-[13.5px] font-medium text-ink transition hover:text-gold"
                    >
                      {item.name}
                    </Link>
                    <span className="mt-0.5 block text-[11.5px] text-muted">
                      {[
                        `SKU: ${item.sku}`,
                        item.variant,
                        item.size && `সাইজ ${toBnDigits(item.size)}`,
                        `পরিমাণ ${toBnDigits(item.quantity)}`,
                      ]
                        .filter(Boolean)
                        .join(" • ")}
                    </span>
                  </span>
                  <span className="shrink-0 text-[13.5px] font-medium text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* পেমেন্ট সারাংশ */}
        <aside className="space-y-5">
          <div className="rounded-sm border border-line bg-white p-5">
            <h2 className="text-[15px] font-semibold text-ink">পেমেন্ট সারাংশ</h2>
            <dl className="mt-4 space-y-2.5 text-[13.5px]">
              <div className="flex items-center justify-between">
                <dt className="text-muted">সাবটোটাল</dt>
                <dd className="font-medium text-ink">{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted">ডেলিভারি চার্জ</dt>
                <dd className="font-medium text-ink">
                  {order.deliveryCharge === 0 ? (
                    <span className="text-leaf">ফ্রি</span>
                  ) : (
                    formatPrice(order.deliveryCharge)
                  )}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-3 text-[18px]">
                <dt className="font-semibold text-ink">সর্বমোট</dt>
                <dd className="font-semibold text-gold-dark">{formatPrice(order.total)}</dd>
              </div>
            </dl>
            <p className="mt-3 rounded-sm bg-gold-tint px-3 py-2.5 text-[12px] leading-relaxed text-ink-soft">
              ডেলিভারির সময় {formatPrice(order.total)} টাকা ক্যাশে পরিশোধ করতে হবে।
            </p>
          </div>

          <div className="rounded-sm border border-line bg-white p-5">
            <h2 className="text-[15px] font-semibold text-ink">সহায়তা প্রয়োজন?</h2>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
              অর্ডার সম্পর্কিত যেকোনো প্রশ্নে অর্ডার আইডি উল্লেখ করে যোগাযোগ করুন।
            </p>
            <div className="mt-3.5 space-y-2.5">
              <ButtonLink
                href={whatsappLink(
                  `আসসালামু আলাইকুম, আমার অর্ডার আইডি #${order.id}। অর্ডারটি সম্পর্কে জানতে চাই।`,
                )}
                variant="whatsapp"
                size="md"
                fullWidth
                target="_blank"
              >
                <Icon name="whatsapp" size={17} />
                WhatsApp-এ যোগাযোগ
              </ButtonLink>
              <ButtonLink
                href={`tel:${siteConfig.contact.phoneIntl}`}
                variant="outline"
                size="md"
                fullWidth
              >
                <Icon name="phone" size={16} />
                {siteConfig.contact.phone}
              </ButtonLink>
            </div>
            <p className="mt-3 text-[11.5px] leading-relaxed text-muted">{siteConfig.demoNotice}</p>
          </div>

          <ButtonLink href="/shop" variant="dark" size="lg" fullWidth>
            আরও কেনাকাটা করুন
          </ButtonLink>
        </aside>
      </div>

      <section className="mt-12">
        <SectionHeading eyebrow="আপনার জন্য" title="পরের বার এগুলো দেখতে পারেন" href="/shop" />
        <ProductRail products={suggestions} />
      </section>
    </div>
  );
}
