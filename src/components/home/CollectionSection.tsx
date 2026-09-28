import { ProductGrid, ProductRail } from "@/components/product/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface CollectionSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href: string;
  linkLabel?: string;
  products: Product[];
  /** মোবাইলে অনুভূমিক স্ক্রল ব্যবহার করবে কি না */
  rail?: boolean;
  tone?: "plain" | "tinted";
  priorityCount?: number;
}

export function CollectionSection({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  products,
  rail = false,
  tone = "plain",
  priorityCount = 0,
}: CollectionSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className={cn("py-12 md:py-16", tone === "tinted" && "bg-cream/50")}>
      <div className="container-x">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          href={href}
          linkLabel={linkLabel}
        />

        {rail ? (
          <ProductRail products={products} />
        ) : (
          <ProductGrid products={products.slice(0, 8)} priorityCount={priorityCount} />
        )}

        <div className="mt-7 text-center sm:hidden">
          <ButtonLink href={href} variant="outline" size="md" fullWidth>
            {linkLabel ?? "সব দেখুন"}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
