"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/config/whatsapp";

/**
 * ফ্লোটিং WhatsApp CTA — সব পেজে থাকে।
 * ছোট ও সংযত গোল বাটন; ডেস্কটপে হোভার করলে পাশে টুলটিপ আসে।
 * নম্বর ও টেক্সট আসে কেন্দ্রীয় কনফিগ (config/whatsapp.ts) থেকে।
 * মোবাইলে স্টিকি অ্যাকশন বারের সাথে সংঘর্ষ এড়াতে --sticky-bar-h ভেরিয়েবল ব্যবহার করা হয়।
 */
export function WhatsAppButton() {
  const [ready, setReady] = useState(false);

  // পেজ লোডের সাথে সাথে ঝাঁপিয়ে না পড়ে—একটু পরে নরমভাবে আসে
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed right-3 z-[60] transition-all duration-500 md:right-5 ${
        ready ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
      style={{ bottom: "calc(var(--sticky-bar-h, 0px) + 0.85rem)" }}
    >
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp: ${siteConfig.whatsapp.shortCta}`}
        className="group relative grid size-11 place-items-center rounded-full bg-leaf text-white shadow-[0_6px_18px_-8px_rgba(47,107,79,0.9)] ring-1 ring-white/25 transition duration-200 hover:bg-[#2b6047] hover:shadow-[0_10px_22px_-10px_rgba(47,107,79,0.95)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf active:scale-95 md:size-[46px]"
      >
        <Icon name="whatsapp" size={22} />

        {/* সংযত টুলটিপ — শুধু ডেস্কটপে */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-[calc(100%+10px)] hidden whitespace-nowrap rounded-full bg-ink/92 px-3 py-1.5 text-[12px] font-medium text-ivory opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
        >
          {siteConfig.whatsapp.shortCta}
        </span>
      </a>
    </div>
  );
}
