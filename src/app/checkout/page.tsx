import type { Metadata } from "next";
import { CheckoutView } from "@/components/cart/CheckoutView";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "চেকআউট — ক্যাশ অন ডেলিভারি",
  description:
    "অ্যাকাউন্ট ছাড়াই অর্ডার করুন। নাম, মোবাইল ও ঠিকানা দিয়ে ক্যাশ অন ডেলিভারিতে অর্ডার সম্পন্ন করুন।",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="শেষ ধাপ"
        title="চেকআউট"
        description="অ্যাকাউন্ট খোলার প্রয়োজন নেই—ঠিকানা দিন, পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।"
        crumbs={[{ label: "কার্ট", href: "/cart" }, { label: "চেকআউট" }]}
      />
      <CheckoutView />
    </>
  );
}
