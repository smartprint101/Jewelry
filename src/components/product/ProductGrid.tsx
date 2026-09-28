import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  className?: string;
  /** ডেস্কটপে কলাম সংখ্যা (মোবাইলে সবসময় ২) */
  columns?: 3 | 4;
  priorityCount?: number;
  animate?: boolean;
}

export function ProductGrid({
  products,
  className,
  columns = 4,
  priorityCount = 0,
  animate = true,
}: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-5 md:gap-x-5 md:gap-y-8",
        columns === 4 ? "md:grid-cols-3 xl:grid-cols-4" : "md:grid-cols-3",
        className,
      )}
    >
      {products.map((product, index) =>
        animate ? (
          <Reveal key={product.slug} delay={Math.min(index, 3) * 0.06} className="h-full">
            <ProductCard product={product} priority={index < priorityCount} />
          </Reveal>
        ) : (
          <ProductCard
            key={product.slug}
            product={product}
            priority={index < priorityCount}
          />
        ),
      )}
    </div>
  );
}

/** মোবাইলে অনুভূমিক স্ক্রল, ডেস্কটপে গ্রিড */
export function ProductRail({ products }: { products: Product[] }) {
  return (
    <>
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 md:hidden">
        {products.map((product) => (
          <div key={product.slug} className="w-[47%] shrink-0 snap-start">
            <ProductCard product={product} sizes="48vw" />
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <ProductGrid products={products.slice(0, 8)} />
      </div>
    </>
  );
}
