import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopView } from "@/components/shop/ShopView";
import { collections, getCollection } from "@/data/collections";
import { getProductsByCollection } from "@/data/products";
import { toBnDigits } from "@/lib/format";
import type { CollectionSlug } from "@/types";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "কালেকশন পাওয়া যায়নি" };

  return {
    title: `${collection.name} — ${collection.subtitle}`,
    description: collection.description,
    alternates: { canonical: `/collection/${collection.slug}` },
    openGraph: {
      title: `${collection.name} | AURELIA`,
      description: collection.description,
      images: [{ url: collection.image, width: 1200, height: 900, alt: collection.name }],
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = getProductsByCollection(collection.slug as CollectionSlug);

  return (
    <>
      <PageHeader
        eyebrow={collection.subtitle}
        title={collection.name}
        description={collection.description}
        crumbs={[{ label: "সকল গয়না", href: "/shop" }, { label: collection.name }]}
        image={collection.image}
        meta={`${toBnDigits(items.length)}টি ডিজাইন`}
      />

      <div className="pt-6 md:pt-8">
        <Suspense
          fallback={
            <div className="container-x py-16 text-center text-sm text-muted">
              পণ্য লোড হচ্ছে…
            </div>
          }
        >
          <ShopView products={items} locked="collection" />
        </Suspense>
      </div>
    </>
  );
}
