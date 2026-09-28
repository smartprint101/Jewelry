import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "dark" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-200 disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-px select-none text-center";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] hover:bg-gold-dark",
  secondary: "bg-cream text-ink border border-sand hover:bg-sand-soft",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]",
  ghost: "text-ink hover:bg-cream",
  dark: "bg-ink text-ivory hover:bg-ink-soft",
  whatsapp: "bg-leaf text-white hover:brightness-110",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base md:h-[52px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  prefetch,
  target,
  rel,
  ariaLabel,
}: CommonProps & {
  href: string;
  prefetch?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} prefetch={prefetch} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
