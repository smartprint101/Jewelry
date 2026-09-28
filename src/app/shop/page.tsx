import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopView } from "@/components/shop/ShopView";
import { products } from "@/data/products";
import { toBnDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "সকল গয়না — রিং, নেকলেস, ইয়াররিং ও আরও",
  description:
    "AURELIA-এর সম্পূর্ণ জুয়েলারি সংগ্রহ। Gold, Diamond, Silver, Gold-Plated ও Pearl গয়না—ফিল্টার ও সাজানোর সুবিধাসহ।",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";

  return (
    <>
      <PageHeader
        eyebrow="কালেকশন"
        title={query ? `“${query}” — সার্চ ফলাফল` : "সকল গয়না"}
        description={
          query
            ? "আপনার খোঁজা শব্দের সাথে মিলে যাওয়া গয়নাগুলো নিচে দেখানো হয়েছে।"
            : "রিং থেকে ব্রাইডাল সেট—সব ক্যাটাগরির গয়না এক জায়গায়। ফিল্টার করে সহজেই পছন্দেরটি খুঁজে নিন।"
        }
        crumbs={[{ label: "সকল গয়না" }]}
        meta={`মোট ${toBnDigits(products.length)}টি ডিজাইন`}
      />

      <div className="pt-6 md:pt-8">
        <Suspense
          fallback={
            <div className="container-x py-16 text-center text-sm text-muted">
              পণ্য লোড হচ্ছে…
            </div>
          }
        >
          <ShopView products={products} />
        </Suspense>
      </div>
    </>
  );
}
