"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import { whatsappConfig } from "@/config/whatsapp";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ডেমো: প্রকৃত প্রজেক্টে এখানে লগিং সার্ভিস যুক্ত হবে
    console.error(error);
  }, [error]);

  return (
    <section className="container-x flex flex-col items-center py-20 text-center md:py-28">
      <span className="grid size-16 place-items-center rounded-full border border-sand bg-cream text-gold">
        <Icon name="info" size={26} />
      </span>

      <h1 className="mt-5 text-[22px] leading-snug text-ink md:text-[28px]">
        দুঃখিত, কিছু একটা সমস্যা হয়েছে
      </h1>
      <p className="mt-2.5 max-w-md text-[13.5px] leading-relaxed text-muted md:text-[15px]">
        পেজটি লোড করতে গিয়ে একটি অপ্রত্যাশিত ত্রুটি দেখা দিয়েছে। আবার চেষ্টা করুন—সমস্যা থাকলে
        আমাদের জানাতে পারেন।
      </p>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <Button size="md" onClick={reset}>
          আবার চেষ্টা করুন
        </Button>
        <ButtonLink href="/" variant="outline" size="md">
          হোমে ফিরে যান
        </ButtonLink>
      </div>

      <p className="mt-7 text-[12.5px] text-muted">
        সহায়তার জন্য{" "}
        <Link
          href={whatsappConfig.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold underline underline-offset-4"
        >
          WhatsApp
        </Link>{" "}
        অথবা কল করুন {siteConfig.contact.phone}
      </p>

      {error.digest && (
        <p className="mt-2 font-mono text-[11px] text-muted/70">ত্রুটি কোড: {error.digest}</p>
      )}
    </section>
  );
}
