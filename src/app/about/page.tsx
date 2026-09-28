import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { whatsappConfig } from "@/config/whatsapp";
import { trustPoints } from "@/data/info";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে",
  description:
    "AURELIA-এর গল্প, কারিগরি দর্শন ও প্রতিশ্রুতি। প্রতিদিনের সৌন্দর্য থেকে বিশেষ দিনের মুহূর্ত—আমাদের গয়না তৈরি হয় যত্নের সাথে।",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: "sparkle" as const,
    title: "নকশায় নিজস্বতা",
    text: "প্রতিটি ডিজাইন আমাদের নিজস্ব স্টুডিওতে আঁকা হয়—কোনো অনুকরণ নয়, বরং বাংলাদেশি রুচির সাথে মানানসই আধুনিক নকশা।",
  },
  {
    icon: "shield" as const,
    title: "স্বচ্ছ তথ্য",
    text: "প্রতিটি পণ্যের ধাতু, ওজন, স্টোন ও যত্নের নির্দেশনা পরিষ্কারভাবে লেখা থাকে। যা নেই, তা আমরা দাবি করি না।",
  },
  {
    icon: "box" as const,
    title: "যত্নে প্যাকেজিং",
    text: "প্রতিটি গয়না আলাদা পাউচ ও গিফট বক্সে প্যাক করা হয়—উপহার দেওয়ার জন্য বাড়তি কিছু করতে হয় না।",
  },
  {
    icon: "support" as const,
    title: "বিক্রয়ের পরেও পাশে",
    text: "সাইজ পরিবর্তন, পলিশ কিংবা সাধারণ মেরামত—অর্ডারের পরেও আমাদের টিম আপনার পাশে থাকে।",
  },
];

const milestones = [
  { value: "৮,৫০০+", label: "সন্তুষ্ট গ্রাহক" },
  { value: "৬৪", label: "জেলায় ডেলিভারি" },
  { value: "৪৬+", label: "নিজস্ব ডিজাইন" },
  { value: "৪.৮", label: "গড় রেটিং" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="আমাদের সম্পর্কে"
        title="সৌন্দর্যের সাথে, স্মৃতির বন্ধন"
        description="AURELIA শুরু হয়েছিল একটি সহজ ভাবনা থেকে—গয়না শুধু অলংকার নয়, প্রতিটি গয়নার সাথে জড়িয়ে থাকে একেকটি স্মৃতি।"
        crumbs={[{ label: "আমাদের সম্পর্কে" }]}
        image="/brand/about.jpg"
      />

      {/* গল্প */}
      <section className="container-x py-12 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="eyebrow">আমাদের গল্প</p>
            <h2 className="mt-2 text-[24px] leading-snug text-ink md:text-[32px]">
              ছোট একটি স্টুডিও থেকে শুরু
            </h2>
            <div className="mt-4 space-y-3.5 text-[14px] leading-[1.9] text-ink-soft md:text-[15px]">
              <p>
                আমাদের যাত্রা শুরু ঢাকার একটি ছোট ডিজাইন স্টুডিও থেকে, যেখানে কয়েকজন কারিগর আর
                একজন ডিজাইনার মিলে প্রতিদিন কয়েকটি করে গয়না তৈরি করতেন। উদ্দেশ্য ছিল একটাই—এমন
                গয়না বানানো যা দেখতে অভিজাত, অথচ পরতে আরামদায়ক এবং দামে সাধ্যের মধ্যে।
              </p>
              <p>
                আজ AURELIA-এর সংগ্রহে রিং, নেকলেস, ইয়াররিং থেকে শুরু করে সম্পূর্ণ ব্রাইডাল সেট
                পর্যন্ত রয়েছে। প্রতিটি ডিজাইন তৈরির আগে আমরা ভাবি—কে পরবেন, কোন উপলক্ষে পরবেন এবং
                দিনশেষে গয়নাটি তাঁকে কেমন অনুভব করাবে।
              </p>
              <p>
                আমরা বিশ্বাস করি, ভালো গয়নার প্রথম শর্ত সততা। তাই প্রতিটি পণ্যের ধাতু ও স্টোনের
                তথ্য পরিষ্কারভাবে লেখা থাকে, আর যা আমাদের পণ্যে নেই—তা আমরা কখনো দাবি করি না।
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <ButtonLink href="/shop" size="md">
                কালেকশন দেখুন
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="md">
                যোগাযোগ করুন
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-sm border border-line">
                <Image
                  src="/brand/care.jpg"
                  alt="AURELIA স্টুডিওতে সাজানো গয়নার সংগ্রহ"
                  fill
                  sizes="(max-width: 1023px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm border border-line">
                <Image
                  src="/brand/packaging-1.jpg"
                  alt="AURELIA গিফট বক্স"
                  fill
                  sizes="(max-width: 1023px) 50vw, 22vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm border border-line">
                <Image
                  src="/brand/packaging-2.jpg"
                  alt="যত্নে করা প্যাকেজিং"
                  fill
                  sizes="(max-width: 1023px) 50vw, 22vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* সংখ্যায় */}
      <section className="border-y border-line bg-ivory-deep py-8 md:py-10">
        <div className="container-x">
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {milestones.map((item) => (
              <li key={item.label} className="text-center">
                <p className="font-bangla-serif text-[26px] font-semibold text-gold md:text-[34px]">
                  {item.value}
                </p>
                <p className="mt-1 text-[12.5px] text-muted md:text-[13.5px]">{item.label}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-[11.5px] text-muted">{siteConfig.demoNotice}</p>
        </div>
      </section>

      {/* মূল্যবোধ */}
      <section className="container-x py-12 md:py-16">
        <SectionHeading
          eyebrow="আমাদের প্রতিশ্রুতি"
          title="যে চারটি বিষয়ে আমরা আপস করি না"
          align="center"
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal as="li" key={value.title} delay={Math.min(index, 3) * 0.06}>
              <div className="h-full rounded-sm border border-line bg-white p-5">
                <span className="grid size-11 place-items-center rounded-full bg-gold-tint text-gold">
                  <Icon name={value.icon} size={20} />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{value.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* কেন AURELIA */}
      <section className="border-t border-line bg-cream py-12 md:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line">
            <Image
              src="/brand/about.jpg"
              alt="কারিগরের হাতে তৈরি হচ্ছে গয়না"
              fill
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">কেন AURELIA</p>
            <h2 className="mt-2 text-[23px] leading-snug text-ink md:text-[30px]">
              হাতে গড়া যত্ন, প্রতিটি ধাপে
            </h2>
            <ul className="mt-5 space-y-3.5">
              {trustPoints.map((point) => (
                <li key={point.title} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-white text-gold">
                    <Icon name={point.icon} size={16} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-ink">{point.title}</span>
                    <span className="block text-[13px] leading-relaxed text-muted">
                      {point.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-12 md:py-16">
        <div className="rounded-sm border border-gold/25 bg-gold-tint px-6 py-10 text-center md:px-10 md:py-14">
          <p className="eyebrow">CodePixel Web</p>
          <h2 className="mx-auto mt-2 max-w-2xl text-[22px] leading-snug text-ink md:text-[30px]">
            এই ডেমো সাইটটি পছন্দ হয়েছে?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[13.5px] leading-relaxed text-ink-soft md:text-[15px]">
            আপনার ব্যবসার জন্যও এমন একটি সম্পূর্ণ ই-কমার্স ওয়েবসাইট তৈরি করে দেওয়া সম্ভব—ডিজাইন
            থেকে ডেলিভারি পর্যন্ত।
          </p>
          <ButtonLink
            href={whatsappConfig.link}
            variant="whatsapp"
            size="lg"
            className="mt-6"
            target="_blank"
          >
            <Icon name="whatsapp" size={18} />
            {whatsappConfig.cta}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
