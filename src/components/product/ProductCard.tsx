"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QuickOrderSheet } from "@/components/product/QuickOrderSheet";
import { WishlistButton } from "@/components/product/WishlistButton";
import { Rating } from "@/components/ui/Rating";
import { materialName } from "@/data/categories";
import { discountPercent, formatPrice, toBnDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-context";
import { useToast } from "@/store/toast-context";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** স্ক্রলার/রেইলে ব্যবহারের জন্য স্থির প্রস্থ */
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function ProductCard({
  product,
  className,
  priority = false,
  sizes = "(max-width: 767px) 48vw, (max-width: 1279px) 30vw, 22vw",
}: ProductCardProps) {
  const [sheet, setSheet] = useState<{ open: boolean; intent: "order" | "cart" }>({
    open: false,
    intent: "order",
  });
  const { addItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const discount = discountPercent(product.price, product.oldPrice);
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const needsSelection = Boolean(product.size || (product.variants?.length ?? 0) > 1);
  const isNew = product.collections.includes("new-arrival");
  const hoverImage = product.images[1];

  const handleOrder = () => {
    if (outOfStock) return;
    if (needsSelection) {
      setSheet({ open: true, intent: "order" });
      return;
    }
    addItem(product, { quantity: 1 });
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    if (outOfStock) return;
    if (needsSelection) {
      setSheet({ open: true, intent: "cart" });
      return;
    }
    addItem(product, { quantity: 1 });
    toast(`“${product.name}” কার্টে যোগ হয়েছে।`, "success");
  };

  return (
    <>
      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-white transition-shadow duration-300 hover:shadow-[var(--shadow-soft)]",
          className,
        )}
      >
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-square overflow-hidden bg-ivory-deep"
          tabIndex={-1}
          aria-hidden
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]",
              hoverImage && "group-hover:opacity-0",
              outOfStock && "opacity-70 grayscale-[0.25]",
            )}
          />
          {hoverImage && (
            <Image
              src={hoverImage}
              alt=""
              fill
              sizes={sizes}
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
            {discount > 0 && (
              <span className="rounded-[2px] bg-maroon px-1.5 py-0.5 text-[10.5px] font-semibold text-white">
                -{toBnDigits(discount)}%
              </span>
            )}
            {isNew && !outOfStock && (
              <span className="rounded-[2px] border border-gold/30 bg-gold-tint px-1.5 py-0.5 text-[10.5px] font-semibold text-gold-dark">
                নতুন
              </span>
            )}
          </div>

          {outOfStock && (
            <span className="absolute inset-x-0 bottom-0 bg-ink/80 py-1.5 text-center text-[11.5px] font-medium tracking-wide text-ivory">
              স্টকে নেই
            </span>
          )}
        </Link>

        <div className="absolute right-2 top-2 z-[3]">
          <WishlistButton slug={product.slug} name={product.name} />
        </div>

        <div className="flex flex-1 flex-col p-2.5 md:p-3.5">
          <p className="mb-1 truncate text-[10.5px] uppercase tracking-[0.14em] text-muted">
            {product.materials.map((material) => materialName(material)).join(" • ")}
          </p>

          <h3 className="line-clamp-2-bn min-h-[2.5em] text-[13px] font-medium leading-snug text-ink md:min-h-[2.6em] md:text-[14.5px]">
            <Link
              href={`/product/${product.slug}`}
              className="transition-colors hover:text-gold focus-visible:text-gold"
            >
              <span className="absolute inset-0 z-[1] md:hidden" aria-hidden />
              {product.name}
            </Link>
          </h3>

          <div className="mt-1.5 hidden md:block">
            <Rating value={product.rating} count={product.reviewCount} size={12} />
          </div>

          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-[14.5px] font-semibold text-ink md:text-[16px]">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[11.5px] text-muted line-through md:text-[12.5px]">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {lowStock && (
            <p className="mt-1 text-[11px] font-medium text-maroon">
              মাত্র {toBnDigits(product.stock)}টি বাকি
            </p>
          )}

          <div className="relative z-[2] mt-2.5 space-y-1.5 md:mt-3">
            <button
              type="button"
              onClick={handleOrder}
              disabled={outOfStock}
              className={cn(
                "flex h-9 w-full items-center justify-center rounded-sm text-[12.5px] font-semibold tracking-wide transition md:h-10 md:text-[13.5px]",
                outOfStock
                  ? "cursor-not-allowed bg-cream text-muted"
                  : "bg-gold text-white hover:bg-gold-dark active:translate-y-px",
              )}
            >
              {outOfStock ? "স্টকে নেই" : "অর্ডার করুন"}
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={cn(
                "flex h-8 w-full items-center justify-center rounded-sm border text-[11.5px] font-medium transition md:h-9 md:text-[12.5px]",
                outOfStock
                  ? "cursor-not-allowed border-line text-muted"
                  : "border-sand text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              কার্টে যোগ করুন
            </button>
          </div>
        </div>
      </article>

      {sheet.open && (
        <QuickOrderSheet
          product={product}
          open
          intent={sheet.intent}
          onClose={() => setSheet((current) => ({ ...current, open: false }))}
        />
      )}
    </>
  );
}
