import { BridalSection } from "@/components/home/BridalSection";
import { BudgetSection } from "@/components/home/BudgetSection";
import { CategorySection } from "@/components/home/CategorySection";
import { CollectionSection } from "@/components/home/CollectionSection";
import { FAQSection } from "@/components/home/FAQSection";
import { Hero } from "@/components/home/Hero";
import { JewelryCare } from "@/components/home/JewelryCare";
import { ReviewSection } from "@/components/home/ReviewSection";
import { SetsSection } from "@/components/home/SetsSection";
import { ShopByType } from "@/components/home/ShopByType";
import { TrustBar } from "@/components/home/TrustBar";
import { TrustSection } from "@/components/home/TrustSection";
import { getProductsByCollection } from "@/data/products";
import { sortProducts } from "@/lib/filters";

export default function HomePage() {
  const newArrivals = getProductsByCollection("new-arrival").slice(0, 8);
  const bestSellers = sortProducts(getProductsByCollection("best-seller"), "popular").slice(0, 8);
  const bridal = getProductsByCollection("bridal");
  const everyday = getProductsByCollection("everyday").slice(0, 8);
  const occasion = getProductsByCollection("occasion").slice(0, 8);

  return (
    <>
      <Hero />
      <TrustBar />
      <CategorySection />

      <CollectionSection
        eyebrow="নতুন কালেকশন"
        title="এই সপ্তাহে নতুন যা এসেছে"
        description="সদ্য যুক্ত হওয়া ডিজাইনগুলো—সীমিত সংখ্যায় তৈরি।"
        href="/collection/new-arrival"
        linkLabel="সব নতুন ডিজাইন"
        products={newArrivals}
        priorityCount={2}
      />

      <CollectionSection
        eyebrow="বেস্ট সেলার"
        title="সবচেয়ে বেশি অর্ডার হওয়া গয়না"
        description="গ্রাহকদের পছন্দের তালিকায় শীর্ষে থাকা ডিজাইন।"
        href="/collection/best-seller"
        linkLabel="সব বেস্ট সেলার"
        products={bestSellers}
        rail
        tone="tinted"
      />

      <BridalSection products={bridal} />
      <SetsSection />
      <ShopByType />
      <BudgetSection />

      <CollectionSection
        eyebrow="দৈনন্দিন গয়না"
        title="প্রতিদিনের জন্য হালকা গয়না"
        description="অফিস, ক্লাস কিংবা ঘরোয়া আয়োজন—সারাদিন পরে থাকার মতো আরামদায়ক ডিজাইন।"
        href="/collection/everyday"
        products={everyday}
        rail
      />

      <CollectionSection
        eyebrow="বিশেষ দিনের গয়না"
        title="উৎসব ও দাওয়াতের সাজ"
        description="বিয়ের দাওয়াত, ঈদ কিংবা পারিবারিক অনুষ্ঠানে আলাদা করে চোখে পড়ার মতো।"
        href="/collection/occasion"
        products={occasion}
        rail
        tone="tinted"
      />

      <JewelryCare />
      <TrustSection />
      <ReviewSection />
      <FAQSection />
    </>
  );
}
