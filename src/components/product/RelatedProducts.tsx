import { ProductRail } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/types";

export function RelatedProducts({
  products,
  title = "এগুলোও ভালো লাগতে পারে",
  href = "/shop",
}: {
  products: Product[];
  title?: string;
  href?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="container-x py-10 md:py-14">
      <SectionHeading
        eyebrow="সম্পর্কিত"
        title={title}
        href={href}
        linkLabel="আরও দেখুন"
      />
      <ProductRail products={products} />
    </section>
  );
}
