"use client";

import { ProductGrid, ProductRail } from "@/components/product/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts, products } from "@/data/products";
import { toBnDigits } from "@/lib/format";
import { useToast } from "@/store/toast-context";
import { useWishlist } from "@/store/wishlist-context";

export function WishlistView() {
  const { slugs, hydrated, clear } = useWishlist();
  const { toast } = useToast();
  const items = products.filter((product) => slugs.includes(product.slug));
  const suggestions = getFeaturedProducts(8);

  if (!hydrated) {
    return (
      <div className="container-x py-16 text-center text-sm text-muted">উইশলিস্ট লোড হচ্ছে…</div>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <EmptyState
          icon="heart"
          title="উইশলিস্টে এখনো কিছু নেই"
          description="পছন্দের গয়নার উপরে হার্ট আইকনে চাপ দিলেই সেটি এখানে জমা হবে—পরে সহজে খুঁজে নিতে পারবেন।"
          actionLabel="গয়না দেখুন"
          actionHref="/shop"
          secondaryLabel="বেস্ট সেলার"
          secondaryHref="/collection/best-seller"
        />
        <section className="container-x pb-14">
          <SectionHeading
            eyebrow="জনপ্রিয়"
            title="শুরু করতে পারেন এগুলো দিয়ে"
            href="/collection/best-seller"
          />
          <ProductRail products={suggestions} />
        </section>
      </>
    );
  }

  return (
    <div className="container-x py-7 md:py-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-ink">
          {toBnDigits(items.length)}টি পণ্য সংরক্ষিত
        </h2>
        <button
          type="button"
          onClick={() => {
            clear();
            toast("উইশলিস্ট খালি করা হয়েছে।", "default");
          }}
          className="inline-flex items-center gap-1.5 text-[12.5px] text-muted transition hover:text-maroon"
        >
          <Icon name="trash" size={14} />
          সব সরিয়ে ফেলুন
        </button>
      </div>

      <ProductGrid products={items} columns={4} animate={false} priorityCount={4} />

      <section className="mt-12">
        <SectionHeading
          eyebrow="আরও দেখুন"
          title="আপনার পছন্দের সাথে মিলিয়ে"
          href="/shop"
        />
        <ProductRail products={suggestions} />
      </section>
    </div>
  );
}
