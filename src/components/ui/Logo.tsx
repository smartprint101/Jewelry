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

const sizes = {
  sm: "text-[19px]",
  md: "text-[22px] md:text-[25px]",
  lg: "text-[28px] md:text-[34px]",
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    >
      <path d="M12 2.8 20.2 12 12 21.2 3.8 12 12 2.8Z" />
      <path d="M12 6.6 16.8 12 12 17.4 7.2 12 12 6.6Z" opacity="0.55" />
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
      <span className="flex items-center gap-2">
        <LogoMark
          className={cn(
            "transition-colors",
            tone === "dark" ? "text-gold" : "text-gold-light",
          )}
        />
        <span
          className={cn(
            "text-display uppercase",
            sizes[size],
            tone === "dark" ? "text-ink" : "text-ivory",
          )}
        >
          {siteConfig.name}
        </span>
      </span>
      {withTagline && (
        <span
          className={cn(
            "mt-1.5 text-[10.5px] tracking-[0.12em]",
            tone === "dark" ? "text-muted" : "text-ivory/65",
          )}
        >
          {siteConfig.tagline}
        </span>
      )}
    </Link>
  );
}
