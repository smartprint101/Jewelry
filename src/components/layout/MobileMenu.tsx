"use client";

import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { Icon } from "@/components/ui/Icon";
import { mainNav, supportLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { categories, materials } from "@/data/categories";
import { countByCategory } from "@/data/products";
import { toBnDigits } from "@/lib/format";
import { whatsappLink } from "@/config/whatsapp";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <Drawer open={open} onClose={onClose} side="left" title="মেনু">
      <nav aria-label="মোবাইল মেনু" className="px-5 py-4">
        <ul className="space-y-0.5">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between rounded-sm py-2.5 text-[15px] font-medium text-ink transition hover:text-gold"
              >
                {item.label}
                <Icon name="chevron-right" size={16} className="text-muted" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="my-4 hairline" />

        <p className="eyebrow mb-2.5">ক্যাটাগরি</p>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/category/${category.slug}`}
                onClick={onClose}
                className="flex items-baseline gap-1.5 py-2 text-[14px] text-ink-soft transition hover:text-gold"
              >
                {category.name}
                <span className="text-[11px] text-muted">
                  ({toBnDigits(countByCategory(category.slug))})
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="my-4 hairline" />

        <p className="eyebrow mb-2.5">ম্যাটেরিয়াল</p>
        <div className="flex flex-wrap gap-2">
          {materials.map((material) => (
            <Link
              key={material.slug}
              href={`/shop?material=${material.slug}`}
              onClick={onClose}
              className="rounded-full border border-sand bg-white px-3 py-1.5 text-[12.5px] text-ink-soft transition hover:border-gold hover:text-gold"
            >
              {material.name}
            </Link>
          ))}
        </div>

        <div className="my-4 hairline" />

        <p className="eyebrow mb-2.5">সহায়তা</p>
        <ul className="space-y-0.5">
          {supportLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-2 text-[14px] text-ink-soft transition hover:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="my-4 hairline" />

        <div className="space-y-2.5 pb-4 text-[13.5px]">
          <a
            href={`tel:${siteConfig.contact.phoneIntl}`}
            className="flex items-center gap-2.5 text-ink-soft transition hover:text-gold"
          >
            <Icon name="phone" size={16} className="text-gold" />
            {siteConfig.contact.phone}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-ink-soft transition hover:text-gold"
          >
            <Icon name="whatsapp" size={16} className="text-leaf" />
            WhatsApp: {siteConfig.whatsapp.displayNumber}
          </a>
        </div>
      </nav>
    </Drawer>
  );
}
