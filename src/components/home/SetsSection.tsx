import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { setHighlights } from "@/data/collections";

export function SetsSection() {
  return (
    <section className="container-x py-12 md:py-16">
      <SectionHeading
        eyebrow="সম্পূর্ণ সেট"
        title="একসাথে মিলিয়ে নেওয়া সাজ"
        description="আলাদা করে মেলানোর ঝামেলা নেই—নেকলেস, ইয়াররিং, ব্রেসলেট বা পূর্ণাঙ্গ ব্রাইডাল সেট একসাথে।"
        href="/category/set"
        linkLabel="সব সেট দেখুন"
      />

      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {setHighlights.map((item, index) => (
          <Reveal key={item.title} delay={Math.min(index, 3) * 0.06}>
            <Link
              href={item.href}
              className="group relative block overflow-hidden rounded-sm border border-line"
            >
              <span className="relative block aspect-[4/5] bg-ivory-deep">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1023px) 48vw, 24vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent"
                />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-3.5 md:p-4">
                <span className="block font-bangla-serif text-[14.5px] font-semibold text-ivory md:text-[17px]">
                  {item.title}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-ivory/75 md:text-[12.5px]">
                  {item.subtitle}
                  <Icon
                    name="arrow-right"
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
