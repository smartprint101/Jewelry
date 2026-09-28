import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/cart/OrderConfirmation";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "অর্ডার নিশ্চিত হয়েছে",
  description: "আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। অর্ডারের বিস্তারিত তথ্য দেখুন।",
  robots: { index: false, follow: false },
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        eyebrow="ধন্যবাদ"
        title="অর্ডার নিশ্চিতকরণ"
        crumbs={[{ label: "অর্ডার" }, { label: `#${id}` }]}
      />
      <OrderConfirmation orderId={id} />
    </>
  );
}
