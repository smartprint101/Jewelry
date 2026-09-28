"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/config/whatsapp";

/**
 * ফ্লোটিং WhatsApp CTA — সব পেজে থাকে।
 * নম্বর ও টেক্সট আসে কেন্দ্রীয় কনফিগ (config/whatsapp.ts) থেকে।
 * মোবাইলে স্টিকি অ্যাকশন বারের সাথে সংঘর্ষ এড়াতে --sticky-bar-h ভেরিয়েবল ব্যবহার করা হয়।
 */
export function WhatsAppButton() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setExpanded(true), 1600);
    const collapse = window.setTimeout(() => setExpanded(false), 8000);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(collapse);
    };
  }, []);

  return (
    <div
      className="fixed right-3 z-[60] md:right-5"
      style={{ bottom: "calc(var(--sticky-bar-h, 0px) + 0.85rem)" }}
    >
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp: ${siteConfig.whatsapp.cta}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        className="group relative flex items-center gap-2.5 rounded-full bg-leaf py-2.5 pl-2.5 pr-3 text-white shadow-[0_10px_30px_-12px_rgba(47,107,79,0.85)] transition-transform duration-200 hover:scale-[1.03] active:scale-95"
      >
        <span
          aria-hidden
          className="absolute left-2.5 top-1/2 size-9 -translate-y-1/2 rounded-full bg-leaf/45 animate-[var(--animate-pulse-ring)]"
        />
        <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-white/15">
          <Icon name="whatsapp" size={21} />
        </span>
        <span
          className={`relative max-w-0 overflow-hidden text-left text-[12.5px] font-medium leading-snug transition-[max-width,opacity,padding] duration-300 ${
            expanded ? "max-w-[180px] pr-1 opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          {siteConfig.whatsapp.cta}
        </span>
      </a>
    </div>
  );
}
