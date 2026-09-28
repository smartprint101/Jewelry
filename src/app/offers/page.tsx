import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopView } from "@/components/shop/ShopView";
import { getDiscountedProducts } from "@/data/products";
import { discountPercent, toBnDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "অফার — ছাড়ে পাওয়া গয়না",
  description:
    "AURELIA-এর চলমান ডেমো অফার। নির্বাচিত রিং, নেকলেস, ইয়াররিং ও সেটে আকর্ষণীয় ছাড়।",
  alternates: { canonical: "/offers" },
};

export default function OffersPage() {
  const items = getDiscountedProducts(15);
  const maxDiscount = items.reduce(
    (max, product) => Math.max(max, discountPercent(product.price, product.oldPrice)),
    0,
  );

  return (
    <>
      <PageHeader
        eyebrow="সীমিত সময়ের অফার"
        title="ছাড়ে পাওয়া গয়না"
        description="নির্বাচিত ডিজাইনে চলছে বিশেষ ছাড়। স্টক সীমিত—পছন্দেরটি দ্রুত সংগ্রহ করুন। (ডেমো অফার)"
        crumbs={[{ label: "অফার" }]}
        meta={`সর্বোচ্চ ${toBnDigits(maxDiscount)}% পর্যন্ত ছাড় • ${toBnDigits(items.length)}টি পণ্য`}
      />

      <div className="pt-6 md:pt-8">
        <Suspense
          fallback={
            <div className="container-x py-16 text-center text-sm text-muted">
              পণ্য লোড হচ্ছে…
            </div>
          }
        >
          <ShopView products={items} />
        </Suspense>
      </div>
    </>
  );
}
