import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { WishlistView } from "@/components/wishlist/WishlistView";

export const metadata: Metadata = {
  title: "আমার উইশলিস্ট",
  description: "পছন্দের গয়নাগুলো সংরক্ষণ করে রাখুন এবং পরে সহজেই অর্ডার করুন।",
  alternates: { canonical: "/wishlist" },
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <>
      <PageHeader
        eyebrow="সংরক্ষিত"
        title="আমার উইশলিস্ট"
        description="যে ডিজাইনগুলো ভালো লেগেছে সেগুলো এখানে জমা থাকে—আপনার ব্রাউজারেই সংরক্ষিত।"
        crumbs={[{ label: "উইশলিস্ট" }]}
      />
      <WishlistView />
    </>
  );
}
