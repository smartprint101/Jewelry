import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/config/whatsapp";
import { getFaqs } from "@/data/faqs";

export function FAQSection({ limit = 8 }: { limit?: number }) {
  const items = getFaqs("home", limit).map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <section className="bg-ivory-deep py-12 md:py-16" aria-labelledby="faq-heading">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">সাধারণ জিজ্ঞাসা</p>
          <h2 id="faq-heading" className="mt-2.5 text-[22px] text-ink md:text-[30px]">
            যা জানতে চান
          </h2>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted md:text-[15px]">
            অর্ডার, ডেলিভারি, সাইজ কিংবা ওয়ারেন্টি—সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নগুলোর উত্তর
            এক জায়গায়।
          </p>

          <div className="mt-6 rounded-sm border border-line bg-white p-4">
            <p className="text-[13px] font-medium text-ink">উত্তর খুঁজে পাননি?</p>
            <p className="mt-1 text-[12.5px] text-muted">
              সরাসরি কল বা WhatsApp করুন—{siteConfig.contact.hours}
            </p>
            <div className="mt-3.5 flex flex-col gap-2 sm:flex-row lg:flex-col">
              <ButtonLink
                href={whatsappLink(
                  "আসসালামু আলাইকুম, AURELIA থেকে একটি পণ্য সম্পর্কে জানতে চাই।",
                )}
                variant="whatsapp"
                size="sm"
                target="_blank"
                className="flex-1"
              >
                <Icon name="whatsapp" size={16} />
                WhatsApp-এ প্রশ্ন করুন
              </ButtonLink>
              <ButtonLink
                href={`tel:${siteConfig.contact.phoneIntl}`}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Icon name="phone" size={15} />
                {siteConfig.contact.phone}
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Accordion items={items} defaultOpen={items[0]?.id} />
        </div>
      </div>
    </section>
  );
}
