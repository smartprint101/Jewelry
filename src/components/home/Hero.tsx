import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import { toBnDigits } from "@/lib/format";

const heroPoints = [
  { icon: "truck" as const, label: "৬৪ জেলায় ডেলিভারি" },
  { icon: "shield" as const, label: "ক্যাশ অন ডেলিভারি" },
  { icon: "box" as const, label: "নিরাপদ প্যাকেজিং" },
];

export function Hero() {
  return (
    <section aria-label="AURELIA — প্রিমিয়াম জুয়েলারি" className="relative">
      <div className="relative min-h-[540px] md:min-h-[600px] lg:min-h-[660px]">
        <Image
          src="/brand/hero.jpg"
          alt="সোনার নেকলেস ও ঝুমকা পরা একজন নারী—AURELIA কালেকশন"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] md:object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/85 to-transparent md:bg-gradient-to-r md:from-ivory md:via-ivory/88 md:to-transparent"
        />

        <div className="container-x relative flex min-h-[540px] items-end pb-10 pt-16 md:min-h-[600px] md:items-center md:pb-16 lg:min-h-[660px]">
          <div className="max-w-[34rem]">
            <p className="eyebrow flex items-center gap-2">
              <span className="inline-block h-px w-6 bg-gold" aria-hidden />
              {siteConfig.name} — প্রিমিয়াম জুয়েলারি
            </p>

            <h1 className="mt-3.5 text-[30px] leading-[1.22] text-ink sm:text-[38px] md:text-[46px] lg:text-[52px]">
              আপনার সৌন্দর্যের গল্প{" "}
              <span className="block text-gold-dark">হোক আরও অনন্য</span>
            </h1>

            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-ink-soft md:text-[16px]">
              {siteConfig.shortDescription}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <ButtonLink href="/shop" size="lg" className="min-w-[160px]">
                কালেকশন দেখুন
              </ButtonLink>
              <ButtonLink
                href="/collection/new-arrival"
                variant="outline"
                size="lg"
                className="min-w-[160px] bg-ivory/60 backdrop-blur-sm"
              >
                নতুন কালেকশন
              </ButtonLink>
            </div>

            <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-ink-soft">
              {heroPoints.map((point) => (
                <li key={point.label} className="flex items-center gap-1.5">
                  <Icon name={point.icon} size={15} className="text-gold" />
                  {point.label}
                </li>
              ))}
              <li className="flex items-center gap-1.5">
                <Icon name="star" size={13} className="text-gold" />
                {toBnDigits("4.8")} — গ্রাহক রেটিং
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
