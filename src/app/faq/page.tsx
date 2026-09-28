import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { whatsappConfig } from "@/config/whatsapp";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "সাধারণ প্রশ্নোত্তর (FAQ)",
  description:
    "অর্ডার, ডেলিভারি, রিটার্ন, ওয়ারেন্টি ও গয়নার যত্ন নিয়ে সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নের উত্তর।",
  alternates: { canonical: "/faq" },
};

const groups = [
  { topic: "order" as const, title: "অর্ডার ও পেমেন্ট", icon: "bag" as const },
  { topic: "delivery" as const, title: "ডেলিভারি", icon: "truck" as const },
  { topic: "product" as const, title: "পণ্য ও সাইজ", icon: "sparkle" as const },
  { topic: "care" as const, title: "যত্ন ও ওয়ারেন্টি", icon: "shield" as const },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="সহায়তা"
        title="সাধারণ প্রশ্নোত্তর"
        description="অর্ডার থেকে শুরু করে গয়নার যত্ন—যা জানা দরকার, সবকিছু এক জায়গায়।"
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="container-x py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-10">
          <div className="space-y-8">
            {groups.map((group) => {
              const items = faqs.filter((faq) => faq.topics.includes(group.topic));
              if (items.length === 0) return null;

              return (
                <div key={group.topic} id={group.topic} className="scroll-mt-24">
                  <h2 className="mb-3 flex items-center gap-2.5 text-[17px] font-semibold text-ink md:text-[19px]">
                    <span className="grid size-9 place-items-center rounded-full bg-gold-tint text-gold">
                      <Icon name={group.icon} size={17} />
                    </span>
                    {group.title}
                  </h2>
                  <Accordion
                    items={items.map((faq) => ({
                      id: faq.id,
                      question: faq.question,
                      answer: faq.answer,
                    }))}
                  />
                </div>
              );
            })}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-[100px] lg:self-start">
            <nav className="rounded-sm border border-line bg-white p-5" aria-label="FAQ বিভাগ">
              <h2 className="text-[14px] font-semibold text-ink">বিভাগসমূহ</h2>
              <ul className="mt-3 space-y-2 text-[13px]">
                {groups.map((group) => (
                  <li key={group.topic}>
                    <a
                      href={`#${group.topic}`}
                      className="inline-flex items-center gap-1.5 text-ink-soft transition hover:text-gold"
                    >
                      <Icon name="chevron-right" size={14} className="text-gold" />
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="rounded-sm border border-line bg-cream p-5">
              <h2 className="text-[14px] font-semibold text-ink">বিস্তারিত নীতিমালা</h2>
              <ul className="mt-3 space-y-2 text-[13px]">
                {[
                  { label: "ডেলিভারি তথ্য", href: "/info/delivery" },
                  { label: "রিটার্ন ও এক্সচেঞ্জ", href: "/info/returns" },
                  { label: "ওয়ারেন্টি", href: "/info/warranty" },
                  { label: "গয়নার যত্ন", href: "/info/jewelry-care" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-ink-soft transition hover:text-gold"
                    >
                      <Icon name="chevron-right" size={14} className="text-gold" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-sm border border-gold/25 bg-gold-tint p-5">
              <h2 className="text-[14px] font-semibold text-ink">উত্তর খুঁজে পাননি?</h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                WhatsApp-এ মেসেজ দিন—সাধারণত কয়েক মিনিটের মধ্যেই উত্তর পাবেন।
              </p>
              <ButtonLink
                href={whatsappConfig.link}
                variant="whatsapp"
                size="md"
                fullWidth
                className="mt-3"
                target="_blank"
              >
                <Icon name="whatsapp" size={17} />
                মেসেজ দিন
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
