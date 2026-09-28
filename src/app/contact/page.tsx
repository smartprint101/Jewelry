import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import { whatsappConfig } from "@/config/whatsapp";
import { getFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "যোগাযোগ",
  description:
    "AURELIA-এর সাথে যোগাযোগ করুন—ফোন, WhatsApp, ইমেইল অথবা শোরুমে। অর্ডার, সাইজ বা কাস্টম ডিজাইন নিয়ে যেকোনো প্রশ্নে আমরা আছি।",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contact } = siteConfig;

  const channels = [
    {
      icon: "phone" as const,
      title: "ফোনে কথা বলুন",
      value: contact.phone,
      note: "অর্ডার ও সাধারণ জিজ্ঞাসা",
      href: `tel:${contact.phoneIntl}`,
    },
    {
      icon: "whatsapp" as const,
      title: "WhatsApp",
      value: whatsappConfig.displayNumber,
      note: "দ্রুততম উত্তর পেতে মেসেজ দিন",
      href: whatsappConfig.link,
      external: true,
    },
    {
      icon: "mail" as const,
      title: "ইমেইল",
      value: contact.email,
      note: "বিস্তারিত জিজ্ঞাসা ও পাইকারি",
      href: `mailto:${contact.email}`,
    },
    {
      icon: "pin" as const,
      title: "শোরুম",
      value: contact.addressLine,
      note: "অ্যাপয়েন্টমেন্ট নিয়ে আসলে ভালো হয়",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="যোগাযোগ"
        title="আমরা আপনার পাশে আছি"
        description="গয়না নির্বাচন, সাইজ, ডেলিভারি কিংবা কাস্টম ডিজাইন—যেকোনো প্রয়োজনে নির্দ্বিধায় যোগাযোগ করুন।"
        crumbs={[{ label: "যোগাযোগ" }]}
      />

      <section className="container-x py-8 md:py-12">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => {
            const inner = (
              <>
                <span className="grid size-11 place-items-center rounded-full bg-gold-tint text-gold">
                  <Icon name={channel.icon} size={19} />
                </span>
                <span className="mt-3.5 block text-[13px] font-semibold text-ink">
                  {channel.title}
                </span>
                <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-soft">
                  {channel.value}
                </span>
                <span className="mt-1 block text-[11.5px] text-muted">{channel.note}</span>
              </>
            );

            return (
              <li key={channel.title}>
                {channel.href ? (
                  <Link
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="block h-full rounded-sm border border-line bg-white p-5 transition hover:border-gold/50 hover:shadow-[0_10px_30px_-24px_rgba(36,29,22,0.7)]"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="h-full rounded-sm border border-line bg-white p-5">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
          <ContactForm />

          <aside className="space-y-5">
            <div className="rounded-sm border border-line bg-white p-5">
              <h2 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                <Icon name="clock" size={17} className="text-gold" />
                সময়সূচি
              </h2>
              <p className="mt-2.5 text-[13.5px] text-ink-soft">{contact.hours}</p>
              <p className="mt-1 text-[12.5px] text-muted">{contact.hoursNote}</p>
              <p className="mt-3 border-t border-line pt-3 text-[12.5px] leading-relaxed text-muted">
                অফিস সময়ের বাইরে WhatsApp-এ মেসেজ দিলে পরদিন সকালে উত্তর দেওয়া হয়।
              </p>
            </div>

            <div className="rounded-sm border border-line bg-cream p-5">
              <h2 className="text-[15px] font-semibold text-ink">দ্রুত সহায়তা</h2>
              <ul className="mt-3 space-y-2 text-[13px]">
                {[
                  { label: "ডেলিভারি তথ্য", href: "/info/delivery" },
                  { label: "রিটার্ন ও এক্সচেঞ্জ", href: "/info/returns" },
                  { label: "ওয়ারেন্টি নীতিমালা", href: "/info/warranty" },
                  { label: "গয়নার যত্ন", href: "/info/jewelry-care" },
                  { label: "সাধারণ প্রশ্নোত্তর", href: "/faq" },
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
              <h2 className="text-[15px] font-semibold text-ink">এমন একটি ওয়েবসাইট চান?</h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                এই ডেমোটি তৈরি করেছে {siteConfig.agency.name}। আপনার ব্র্যান্ডের জন্যও সম্পূর্ণ
                ই-কমার্স সাইট তৈরি করে দেওয়া সম্ভব।
              </p>
              <ButtonLink
                href={whatsappConfig.link}
                variant="whatsapp"
                size="md"
                fullWidth
                className="mt-3.5"
                target="_blank"
              >
                <Icon name="whatsapp" size={17} />
                {whatsappConfig.cta}
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-ivory-deep py-12 md:py-16">
        <div className="container-x max-w-3xl">
          <h2 className="text-center text-[21px] text-ink md:text-[26px]">
            যোগাযোগের আগে দেখে নিন
          </h2>
          <p className="mt-2 text-center text-[13.5px] text-muted">
            সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নগুলোর উত্তর এখানেই পেতে পারেন।
          </p>
          <div className="mt-6">
            <Accordion items={getFaqs("order", 5).map((faq) => ({
              id: faq.id,
              question: faq.question,
              answer: faq.answer,
            }))} />
          </div>
          <p className="mt-6 text-center text-[13px] text-muted">
            আরও প্রশ্ন?{" "}
            <Link href="/faq" className="font-medium text-gold underline underline-offset-4">
              সম্পূর্ণ FAQ দেখুন
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
