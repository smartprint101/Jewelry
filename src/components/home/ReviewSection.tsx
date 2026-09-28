import Link from "next/link";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { averageRating, getHomeReviews, reviews } from "@/data/reviews";
import { formatCount, formatRating } from "@/lib/format";

export function ReviewSection() {
  const items = getHomeReviews(6);

  return (
    <section className="container-x py-12 md:py-16" aria-labelledby="review-heading">
      <SectionHeading
        eyebrow="গ্রাহকদের মতামত"
        title="যা বলছেন আমাদের গ্রাহকেরা"
        description={`গড় রেটিং ${formatRating(averageRating())} — ${formatCount(reviews.length)}টি মতামতের ভিত্তিতে (ডেমো কনটেন্ট)।`}
      />

      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {items.map((review, index) => (
          <Reveal as="li" key={review.id} delay={Math.min(index, 5) * 0.05}>
            <figure className="flex h-full flex-col rounded-sm border border-line bg-white p-4 md:p-5">
              <Rating value={review.rating} showValue={false} size={14} />
              <blockquote className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-soft">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-4 border-t border-line pt-3">
                <span className="block text-[13px] font-semibold text-ink">{review.name}</span>
                <span className="block text-[11.5px] text-muted">{review.location}</span>
                <Link
                  href={`/product/${review.productSlug}`}
                  className="mt-1.5 inline-block text-[11.5px] text-gold underline underline-offset-4"
                >
                  {review.productName}
                </Link>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
