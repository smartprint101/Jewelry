import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopView } from "@/components/shop/ShopView";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { toBnDigits } from "@/lib/format";
import type { CategorySlug } from "@/types";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "ক্যাটাগরি পাওয়া যায়নি" };

  return {
    title: `${category.name} — ${category.nameEn} কালেকশন`,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: `${category.name} | AURELIA`,
      description: category.description,
      images: [{ url: category.image, width: 1200, height: 900, alt: category.name }],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getProductsByCategory(category.slug as CategorySlug);

  return (
    <>
      <PageHeader
        eyebrow="ক্যাটাগরি"
        title={category.name}
        description={category.description}
        crumbs={[{ label: "সকল গয়না", href: "/shop" }, { label: category.name }]}
        image={category.image}
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
          <ShopView products={items} locked="category" />
        </Suspense>
      </div>
    </>
  );
}
