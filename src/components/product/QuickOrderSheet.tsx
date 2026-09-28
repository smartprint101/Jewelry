"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SizeGuideDialog } from "@/components/product/SizeGuideDialog";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { Icon } from "@/components/ui/Icon";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatPrice, toBnDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-context";
import { useToast } from "@/store/toast-context";
import type { Product } from "@/types";

interface QuickOrderSheetProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  /** order = অর্ডার করুন, cart = কার্টে যোগ করুন */
  intent: "order" | "cart";
}

export function QuickOrderSheet({ product, open, onClose, intent }: QuickOrderSheetProps) {
  const [variant, setVariant] = useState<string | undefined>();
  const [size, setSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  if (!product) return null;

  const activeVariant = product.variants?.find((item) => item.id === variant);
  const image = activeVariant?.image ?? product.images[0];

  const submit = (mode: "order" | "cart") => {
    if (product.size && !size) {
      toast(`অনুগ্রহ করে ${product.size.label.replace(" নির্বাচন করুন", "")} নির্বাচন করুন।`, "error");
      return;
    }

    addItem(product, {
      quantity,
      variant: activeVariant?.name,
      size,
      image,
    });

    if (mode === "order") {
      onClose();
      router.push("/checkout");
      return;
    }

    toast(`“${product.name}” কার্টে যোগ হয়েছে।`, "success");
    onClose();
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        side="bottom"
        title={intent === "order" ? "অর্ডার করুন" : "কার্টে যোগ করুন"}
      >
        <div className="px-5 py-4">
          <div className="flex gap-3.5">
            <span className="relative size-20 shrink-0 overflow-hidden rounded-sm border border-line bg-white">
              <Image src={image} alt={product.name} fill sizes="80px" className="object-cover" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-bangla-serif text-[15.5px] font-semibold leading-snug text-ink">
                {product.name}
              </h3>
              <p className="mt-0.5 text-[12px] text-muted">SKU: {product.sku}</p>
              <p className="mt-1.5 flex items-baseline gap-2">
                <span className="text-[17px] font-semibold text-ink">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-[13px] text-muted line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </p>
            </div>
          </div>

          {product.variants && product.variants.length > 0 && (
            <fieldset className="mt-5">
              <legend className="mb-2 text-[13px] font-medium text-ink">
                রঙ নির্বাচন করুন
                {activeVariant && (
                  <span className="ml-1.5 text-muted">— {activeVariant.name}</span>
                )}
              </legend>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVariant(item.id)}
                    aria-pressed={variant === item.id}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] transition",
                      variant === item.id
                        ? "border-gold bg-gold-tint text-ink"
                        : "border-sand bg-white text-ink-soft hover:border-gold/60",
                    )}
                  >
                    <span
                      aria-hidden
                      className="size-3.5 rounded-full border border-black/10"
                      style={{ background: item.swatch }}
                    />
                    {item.name}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {product.size && (
            <fieldset className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <legend className="text-[13px] font-medium text-ink">
                  {product.size.label}
                </legend>
                {product.size.guide && (
                  <button
                    type="button"
                    onClick={() => setGuideOpen(true)}
                    className="inline-flex items-center gap-1 text-[12px] font-medium text-gold underline underline-offset-4"
                  >
                    <Icon name="ruler" size={14} />
                    সাইজ গাইড
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.size.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    aria-pressed={size === option}
                    className={cn(
                      "min-w-11 rounded-sm border px-3 py-2 text-[13px] transition",
                      size === option
                        ? "border-ink bg-ink text-ivory"
                        : "border-sand bg-white text-ink-soft hover:border-ink/40",
                    )}
                  >
                    {toBnDigits(option)}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-5 flex items-center justify-between gap-4">
            <span className="text-[13px] font-medium text-ink">পরিমাণ</span>
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              max={Math.max(product.stock, 1)}
            />
          </div>

          <div className="mt-6 grid gap-2.5 pb-2">
            <Button size="lg" fullWidth onClick={() => submit("order")}>
              অর্ডার করুন — {formatPrice(product.price * quantity)}
            </Button>
            <Button variant="outline" fullWidth onClick={() => submit("cart")}>
              কার্টে যোগ করুন
            </Button>
          </div>
        </div>
      </Drawer>

      {product.size?.guide && (
        <SizeGuideDialog
          open={guideOpen}
          onClose={() => setGuideOpen(false)}
          type={product.size.type}
        />
      )}
    </>
  );
}
