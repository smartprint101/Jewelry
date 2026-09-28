import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { whatsappConfig } from "@/config/whatsapp";
import { getInfoPage, infoPages } from "@/data/info";

export function generateStaticParams() {
  return infoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getInfoPage(slug);
  if (!page) return { title: "পেজটি পাওয়া যায়নি" };

  return {
    title: page.title,
    description: page.subtitle,
    alternates: { canonical: `/info/${page.slug}` },
  };
}

export default async function InfoPageView({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getInfoPage(slug);
  if (!page) notFound();

  const others = infoPages.filter((item) => item.slug !== page.slug);

  return (
    <>
      <PageHeader
        eyebrow="সহায়তা"
        title={page.title}
        description={page.subtitle}
        crumbs={[{ label: page.title }]}
      />

      <section className="container-x py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:gap-10">
          <article className="max-w-3xl">
            {page.sections.map((section) => (
              <div key={section.heading} className="mb-7 last:mb-0">
                <h2 className="text-[17px] font-semibold text-ink md:text-[20px]">
                  {section.heading}
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {section.body.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-ink-soft md:text-[14.5px]"
                    >
                      <Icon name="check" size={16} className="mt-1 shrink-0 text-gold" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="mt-8 rounded-sm border border-line bg-cream px-4 py-3.5 text-[12.5px] leading-relaxed text-muted">
              এই পেজের তথ্য ডেমো উপস্থাপনার জন্য তৈরি। প্রকৃত ব্যবসার ক্ষেত্রে নীতিমালা আপনার
              প্রতিষ্ঠানের নিয়ম অনুযায়ী নির্ধারিত হবে।
            </p>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-[100px] lg:self-start">
            <nav className="rounded-sm border border-line bg-white p-5" aria-label="অন্যান্য তথ্য">
              <h2 className="text-[14px] font-semibold text-ink">আরও তথ্য</h2>
              <ul className="mt-3 space-y-2 text-[13px]">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/info/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-ink-soft transition hover:text-gold"
                    >
                      <Icon name="chevron-right" size={14} className="text-gold" />
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/faq"
                    className="inline-flex items-center gap-1.5 text-ink-soft transition hover:text-gold"
                  >
                    <Icon name="chevron-right" size={14} className="text-gold" />
                    সাধারণ প্রশ্নোত্তর
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="rounded-sm border border-gold/25 bg-gold-tint p-5">
              <h2 className="text-[14px] font-semibold text-ink">সরাসরি কথা বলুন</h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                কোনো বিষয়ে পরিষ্কার না হলে WhatsApp-এ জানান—আমরা সাহায্য করবো।
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
