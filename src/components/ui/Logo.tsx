import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** ট্যাগলাইন দেখাবে কি না */
  withTagline?: boolean;
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

const wordSizes = {
  sm: "text-[18px] tracking-[0.26em]",
  md: "text-[21px] md:text-[24px] tracking-[0.28em]",
  lg: "text-[27px] md:text-[33px] tracking-[0.3em]",
};

const markSizes = {
  sm: "size-[22px]",
  md: "size-[26px] md:size-[29px]",
  lg: "size-[34px] md:size-[40px]",
};

const gapSizes = {
  sm: "gap-2",
  md: "gap-2.5",
  lg: "gap-3",
};

/**
 * AURELIA মনোগ্রাম — সরু গোল্ড রিং-এর ভিতরে ব্রিলিয়ান্ট-কাট রত্ন।
 * গ্রেডিয়েন্ট আইডি ইউনিক রাখতে `idSuffix` ব্যবহার করা হয় (একই পেজে একাধিক লোগো থাকলে)।
 */
export function LogoMark({
  className,
  tone = "dark",
  idSuffix = "d",
}: {
  className?: string;
  tone?: "dark" | "light";
  idSuffix?: string;
}) {
  const gradId = `aurelia-gold-${idSuffix}`;
  const from = tone === "dark" ? "#d4b075" : "#f0dcb4";
  const via = tone === "dark" ? "#a97c3f" : "#d4b075";
  const to = tone === "dark" ? "#8a6430" : "#b98f52";

  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("shrink-0", className)}
      aria-hidden
      fill="none"
    >
      <defs>
        <linearGradient id={gradId} x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="0.5" stopColor={via} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>

      {/* সরু বাইরের রিং */}
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke={`url(#${gradId})`}
        strokeWidth="1"
        opacity="0.45"
      />

      {/* রত্নের রূপরেখা — ক্রাউন ও প্যাভিলিয়ন */}
      <g stroke={`url(#${gradId})`} strokeLinejoin="round" strokeLinecap="round">
        <path d="M15.4 17.6h17.2L24 35.4 15.4 17.6Z" strokeWidth="1.5" />
        <path d="M13 17.6h22L30.9 11H17.1L13 17.6Z" strokeWidth="1.5" />
        {/* ফ্যাসেট লাইন */}
        <g strokeWidth="0.9" opacity="0.62">
          <path d="M17.1 11 19.6 17.6 24 35.4 28.4 17.6 30.9 11" />
          <path d="M13 17.6h22" />
          <path d="m19.6 17.6 4.4-6.6 4.4 6.6" />
        </g>
      </g>

      {/* ঝলক */}
      <circle cx="24" cy="21.4" r="1.05" fill={from} opacity="0.9" />
    </svg>
  );
}

export function Logo({ className, withTagline, tone = "dark", size = "md" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex flex-col items-center leading-none", className)}
      aria-label={`${siteConfig.name} — হোম`}
    >
      <span className={cn("flex items-center", gapSizes[size])}>
        <LogoMark
          tone={tone}
          idSuffix={tone}
          className={cn(
            markSizes[size],
            "transition-transform duration-500 group-hover:rotate-[8deg]",
          )}
        />
        <span className="flex flex-col items-start leading-none">
          <span
            className={cn(
              "text-display font-medium uppercase",
              wordSizes[size],
              // ট্র্যাকিং-এর কারণে শেষে যে ফাঁকা জায়গা তৈরি হয় তা সরানো
              "-mr-[0.28em]",
              tone === "dark" ? "text-ink" : "text-ivory",
            )}
          >
            {siteConfig.name}
          </span>
          <span
            aria-hidden
            className={cn(
              "mt-[5px] h-px w-full origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100",
              tone === "dark"
                ? "from-gold via-gold-light to-transparent"
                : "from-gold-light via-champagne to-transparent",
            )}
          />
        </span>
      </span>
      {withTagline && (
        <span
          className={cn(
            "mt-2 text-[10.5px] tracking-[0.14em]",
            tone === "dark" ? "text-muted" : "text-ivory/65",
          )}
        >
          {siteConfig.tagline}
        </span>
      )}
    </Link>
  );
}
