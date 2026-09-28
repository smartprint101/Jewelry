import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { quickLinks, supportLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/config/whatsapp";
import { categories } from "@/data/categories";
import { toBnDigits } from "@/lib/format";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-ink/10 bg-ink text-ivory/75 md:mt-24">
      <div className="container-x py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* ব্র্যান্ড */}
          <div className="md:col-span-4">
            <Logo tone="light" size="md" className="items-start" />
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {[
                { name: "facebook" as const, href: siteConfig.social.facebook, label: "Facebook" },
                { name: "instagram" as const, href: siteConfig.social.instagram, label: "Instagram" },
                { name: "youtube" as const, href: siteConfig.social.youtube, label: "YouTube" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-9 place-items-center rounded-full border border-ivory/15 text-ivory/70 transition hover:border-gold-light/60 hover:text-gold-light"
                >
                  <Icon name={item.name} size={17} label={item.label} />
                </a>
              ))}
            </div>
          </div>

          {/* দ্রুত লিংক */}
          <nav aria-label="দ্রুত লিংক" className="md:col-span-2">
            <h2 className="font-bangla-serif text-[15px] font-semibold text-ivory">
              দ্রুত লিংক
            </h2>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-gold-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* সহায়তা */}
          <nav aria-label="সহায়তা" className="md:col-span-2">
            <h2 className="font-bangla-serif text-[15px] font-semibold text-ivory">সহায়তা</h2>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-gold-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* যোগাযোগ */}
          <div className="md:col-span-4">
            <h2 className="font-bangla-serif text-[15px] font-semibold text-ivory">যোগাযোগ</h2>
            <ul className="mt-4 space-y-3 text-[13.5px]">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneIntl}`}
                  className="flex items-start gap-2.5 transition hover:text-gold-light"
                >
                  <Icon name="phone" size={16} className="mt-0.5 shrink-0 text-gold-light" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 transition hover:text-gold-light"
                >
                  <Icon name="whatsapp" size={16} className="mt-0.5 shrink-0 text-gold-light" />
                  WhatsApp — {siteConfig.whatsapp.displayNumber}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-2.5 transition hover:text-gold-light"
                >
                  <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-gold-light" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-gold-light" />
                <span>{siteConfig.contact.addressLine}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-gold-light" />
                <span>
                  {siteConfig.contact.hours}
                  <span className="block text-ivory/50">{siteConfig.contact.hoursNote}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ক্যাটাগরি লিংক */}
        <div className="mt-10 border-t border-ivory/10 pt-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-ivory/55">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="transition hover:text-gold-light"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col gap-2 py-5 text-[12px] text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {toBnDigits(year)} {siteConfig.name}. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="max-w-xl text-ivory/40">{siteConfig.demoNotice}</p>
          <a
            href={siteConfig.agency.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ivory/45 transition hover:text-gold-light"
          >
            {siteConfig.agency.credit}
          </a>
        </div>
      </div>
    </footer>
  );
}
