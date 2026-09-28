import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "আমার কার্ট",
  description: "আপনার নির্বাচিত গয়নাগুলো দেখুন, পরিমাণ পরিবর্তন করুন এবং ক্যাশ অন ডেলিভারিতে অর্ডার করুন।",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageHeader
        eyebrow="শপিং ব্যাগ"
        title="আমার কার্ট"
        description="পরিমাণ ঠিক করে নিন, তারপর চেকআউটে গিয়ে ঠিকানা দিলেই অর্ডার সম্পন্ন।"
        crumbs={[{ label: "কার্ট" }]}
      />
      <CartView />
    </>
  );
}
