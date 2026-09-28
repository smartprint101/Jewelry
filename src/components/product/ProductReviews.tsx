import { Rating } from "@/components/ui/Rating";
import { Icon } from "@/components/ui/Icon";
import { genericReviews, getReviewsForProduct } from "@/data/reviews";
import { formatCount, formatDate, formatRating, toBnDigits } from "@/lib/format";
import type { Product } from "@/types";

export function ProductReviews({ product }: { product: Product }) {
  const own = getReviewsForProduct(product.slug);
  const extra = genericReviews
    .filter((_, index) => index % 2 === (own.length % 2))
    .slice(0, Math.max(0, 3 - own.length))
    .map((review, index) => ({
      ...review,
      id: `${product.slug}-generic-${index}`,
      productName: product.name,
      productSlug: product.slug,
    }));

  const items = [...own, ...extra];

  /** রেটিং বণ্টন—ডেমো উপস্থাপনার জন্য প্রোডাক্ট রেটিং থেকে হিসাব করা */
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const base = Math.max(0, 1 - Math.abs(product.rating - star) / 1.6);
    return { star, percent: Math.round(base * 100) };
  });
  const total = distribution.reduce((sum, item) => sum + item.percent, 0) || 1;

  return (
    <section
      id="reviews"
      className="border-t border-line bg-ivory-deep py-10 md:py-14"
      aria-labelledby="reviews-heading"
    >
      <div className="container-x">
        <h2 id="reviews-heading" className="text-[20px] text-ink md:text-[26px]">
          গ্রাহক রিভিউ
        </h2>
        <p className="mt-1.5 text-[12.5px] text-muted">
          নিচের রিভিউগুলো ডেমো কনটেন্ট—উপস্থাপনার উদ্দেশ্যে তৈরি।
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
          <div className="rounded-sm border border-line bg-white p-5">
            <div className="flex items-end gap-3">
              <span className="font-bangla-serif text-[38px] font-semibold leading-none text-ink">
                {formatRating(product.rating)}
              </span>
              <span className="pb-1 text-[12.5px] text-muted">৫-এর মধ্যে</span>
            </div>
            <Rating value={product.rating} showValue={false} size={16} className="mt-2" />
            <p className="mt-1.5 text-[12.5px] text-muted">
              {formatCount(product.reviewCount)}টি রেটিংয়ের ভিত্তিতে
            </p>

            <ul className="mt-4 space-y-1.5">
              {distribution.map((row) => (
                <li key={row.star} className="flex items-center gap-2 text-[11.5px] text-muted">
                  <span className="w-6 shrink-0">{toBnDigits(row.star)}★</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream">
                    <span
                      className="block h-full rounded-full bg-gold"
                      style={{ width: `${Math.round((row.percent / total) * 100)}%` }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="space-y-3">
            {items.map((review) => (
              <li key={review.id} className="rounded-sm border border-line bg-white p-4 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-full bg-cream font-bangla-serif text-[15px] font-semibold text-gold">
                      {review.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-[13.5px] font-semibold text-ink">
                        {review.name}
                      </span>
                      <span className="block text-[11.5px] text-muted">{review.location}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Rating value={review.rating} showValue={false} size={13} />
                    <span className="text-[11.5px] text-muted">{formatDate(review.date)}</span>
                  </div>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                  “{review.text}”
                </p>
                <p className="mt-2.5 flex items-center gap-1.5 text-[11.5px] text-leaf">
                  <Icon name="check-circle" size={13} />
                  ডেমো ভেরিফাইড অর্ডার
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
