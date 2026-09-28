import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  className,
  tone = "dark",
}: {
  items: Crumb[];
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <nav aria-label="ব্রেডক্রাম্ব" className={cn("text-[12px]", className)}>
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link
            href="/"
            className={cn(
              "transition",
              tone === "dark" ? "text-muted hover:text-gold" : "text-ivory/60 hover:text-gold-light",
            )}
          >
            হোম
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1">
            <Icon
              name="chevron-left"
              size={12}
              className={cn(
                "rotate-180",
                tone === "dark" ? "text-muted/60" : "text-ivory/40",
              )}
            />
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "transition",
                  tone === "dark"
                    ? "text-muted hover:text-gold"
                    : "text-ivory/60 hover:text-gold-light",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className={cn(tone === "dark" ? "text-ink" : "text-ivory")}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
