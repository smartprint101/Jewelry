import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { siteConfig } from "@/config/site";
import { categoryName } from "@/data/categories";
import { getProduct, getRelatedProducts, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "পণ্য পাওয়া যায়নি" };

  const description = `${product.shortDescription} মূল্য ৳${product.price.toLocaleString("en-IN")}। ক্যাশ অন ডেলিভারি, সারা বাংলাদেশে ডেলিভারি।`;

  return {
    title: `${product.name} — ${categoryName(product.category)}`,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} | ${siteConfig.name}`,
      description,
      images: [
        { url: product.images[0], width: 1000, height: 1000, alt: product.name },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((image) => `${siteConfig.url}${image}`),
    description: product.shortDescription,
    sku: product.sku,
    brand: { "@type": "Brand", name: siteConfig.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${siteConfig.url}/product/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-line bg-ivory-deep">
        <div className="container-x py-3">
          <Breadcrumbs
            items={[
              { label: "সকল গয়না", href: "/shop" },
              {
                label: categoryName(product.category),
                href: `/category/${product.category}`,
              },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <ProductDetail product={product} />
      <ProductTabs product={product} />
      <ProductReviews product={product} />
      <RelatedProducts
        products={related}
        href={`/category/${product.category}`}
        title={`আরও ${categoryName(product.category)}`}
      />
    </>
  );
}
