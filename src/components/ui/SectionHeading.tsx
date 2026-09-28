import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "সব দেখুন",
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-6 flex gap-4 md:mb-8",
        align === "center"
          ? "flex-col items-center text-center"
          : "flex-row items-end justify-between",
        className,
      )}
    >
      <div className={cn(align === "center" && "max-w-2xl")}>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <Tag className="text-[22px] leading-tight text-ink md:text-[30px]">{title}</Tag>
        {align === "center" && (
          <span className="gold-rule mx-auto mt-3.5 block" aria-hidden />
        )}
        {description && (
          <p
            className={cn(
              "mt-2.5 text-[13.5px] leading-relaxed text-muted md:text-[15px]",
              align === "left" && "max-w-xl",
            )}
          >
            {description}
          </p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="group hidden shrink-0 items-center gap-1.5 border-b border-transparent pb-0.5 text-[13px] font-medium text-ink transition hover:border-gold hover:text-gold sm:inline-flex"
        >
          {linkLabel}
          <Icon
            name="arrow-right"
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
