"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SizeGuideDialog } from "@/components/product/SizeGuideDialog";
import { WishlistButton } from "@/components/product/WishlistButton";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Rating } from "@/components/ui/Rating";
import { siteConfig } from "@/config/site";
import { whatsappProductLink } from "@/config/whatsapp";
import { categoryName, materialName } from "@/data/categories";
import { discountPercent, formatPrice, toBnDigits } from "@/lib/format";
import { cn, stockLabel } from "@/lib/utils";
import { useCart } from "@/store/cart-context";
import { useToast } from "@/store/toast-context";
import type { Product } from "@/types";

export function ProductDetail({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants?.[0]?.id);
  const [size, setSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const activeVariant = product.variants?.find((item) => item.id === variant);
  const discount = discountPercent(product.price, product.oldPrice);
  const stock = stockLabel(product.stock);
  const outOfStock = product.stock <= 0;

  const images = useMemo(() => {
    if (!activeVariant?.image) return product.images;
    return [activeVariant.image, ...product.images.filter((img) => img !== activeVariant.image)];
  }, [activeVariant, product.images]);

  /** মোবাইল স্টিকি বার থাকলে WhatsApp বাটন উপরে সরে যায় */
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      root.style.setProperty("--sticky-bar-h", window.innerWidth < 1024 ? "64px" : "0px");
    };
    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      root.style.setProperty("--sticky-bar-h", "0px");
    };
  }, []);

  const ensureSelection = () => {
    if (product.size && !size) {
      toast(
        `অনুগ্রহ করে ${product.size.label.replace(" নির্বাচন করুন", "")} নির্বাচন করুন।`,
        "error",
      );
      document.getElementById("size-selector")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return false;
    }
    return true;
  };

  const addToCart = (silent = false) => {
    if (outOfStock || !ensureSelection()) return false;
    addItem(product, {
      quantity,
      variant: activeVariant?.name,
      size,
      image: images[0],
    });
    if (!silent) toast(`“${product.name}” কার্টে যোগ হয়েছে।`, "success");
    return true;
  };

  const orderNow = () => {
    if (addToCart(true)) router.push("/checkout");
  };

  const specRows = [
    ["ধাতু", product.specs.metal],
    ["গোল্ড ক্যারেট", product.specs.karat],
    ["ওজন", product.specs.weight],
    ["স্টোন", product.specs.stone],
    ["স্টোনের ধরন", product.specs.stoneType],
    ["রঙ", product.specs.color],
    ["চেইনের দৈর্ঘ্য", product.specs.chainLength],
    ["ব্রেসলেট সাইজ", product.specs.braceletSize],
    ["পণ্যের মাত্রা", product.specs.dimensions],
    ["পলিশ", product.specs.polish],
    ["লক/ক্লোজার", product.specs.closure],
    ["পিস", product.specs.pieces],
    ["সার্টিফিকেট", product.specs.certificate],
    ["ওয়ারেন্টি", product.specs.warranty],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <>
      <div className="container-x pt-5 md:pt-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-[100px] lg:self-start">
            <ProductGallery
              key={images[0]}
              images={images}
              alt={product.name}
              badge={discount > 0 ? `-${toBnDigits(discount)}%` : undefined}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 text-[11.5px]">
              <Link
                href={`/category/${product.category}`}
                className="rounded-full border border-sand bg-white px-2.5 py-1 text-ink-soft transition hover:border-gold hover:text-gold"
              >
                {categoryName(product.category)}
              </Link>
              {product.materials.map((material) => (
                <Link
                  key={material}
                  href={`/shop?material=${material}`}
                  className="rounded-full border border-sand bg-white px-2.5 py-1 text-ink-soft transition hover:border-gold hover:text-gold"
                >
                  {materialName(material)}
                </Link>
              ))}
            </div>

            <h1 className="mt-3 text-[23px] leading-snug text-ink md:text-[30px]">
              {product.name}
            </h1>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <Rating value={product.rating} count={product.reviewCount} size={15} />
              <span className="text-[12px] text-muted">SKU: {product.sku}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-[12px] font-medium",
                  stock.tone === "out" && "text-maroon",
                  stock.tone === "low" && "text-gold-dark",
                  stock.tone === "in" && "text-leaf",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 rounded-full",
                    stock.tone === "out" && "bg-maroon",
                    stock.tone === "low" && "bg-gold",
                    stock.tone === "in" && "bg-leaf",
                  )}
                />
                {stock.tone === "low"
                  ? `মাত্র ${toBnDigits(product.stock)}টি বাকি`
                  : stock.text}
              </span>
            </div>

            <p className="mt-4 text-[14px] leading-relaxed text-ink-soft md:text-[15px]">
              {product.shortDescription}
            </p>

            {/* মূল্য */}
            <div className="mt-5 flex flex-wrap items-baseline gap-3 border-y border-line py-4">
              <span className="text-[26px] font-semibold text-ink md:text-[30px]">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-[15px] text-muted line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="rounded-[2px] bg-maroon-soft px-2 py-0.5 text-[12px] font-semibold text-maroon">
                    {toBnDigits(discount)}% ছাড়
                  </span>
                </>
              )}
              <span className="w-full text-[11.5px] text-muted">
                মূল্যে ভ্যাট অন্তর্ভুক্ত • ডেলিভারি চার্জ আলাদা
              </span>
            </div>

            {/* ভ্যারিয়েন্ট */}
            {product.variants && product.variants.length > 0 && (
              <fieldset className="mt-5">
                <legend className="mb-2.5 text-[13.5px] font-semibold text-ink">
                  রঙ নির্বাচন করুন
                  {activeVariant && (
                    <span className="ml-1.5 font-normal text-muted">
                      — {activeVariant.name}
                    </span>
                  )}
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setVariant(item.id)}
                      aria-pressed={variant === item.id}
                      className={cn(
                        "flex items-center gap-2 rounded-sm border px-3 py-2 text-[13px] transition",
                        variant === item.id
                          ? "border-gold bg-gold-tint text-ink"
                          : "border-sand bg-white text-ink-soft hover:border-gold/60",
                      )}
                    >
                      <span
                        aria-hidden
                        className="size-4 rounded-full border border-black/10"
                        style={{ background: item.swatch }}
                      />
                      {item.name}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {/* সাইজ */}
            {product.size && (
              <fieldset className="mt-5 scroll-mt-24" id="size-selector">
                <div className="mb-2.5 flex items-center justify-between gap-3">
                  <legend className="text-[13.5px] font-semibold text-ink">
                    {product.size.label}
                  </legend>
                  {product.size.guide && (
                    <button
                      type="button"
                      onClick={() => setGuideOpen(true)}
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-gold underline underline-offset-4"
                    >
                      <Icon name="ruler" size={15} />
                      {product.size.type === "ring" ? "রিং সাইজ গাইড" : "সাইজ গাইড"}
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
                        "min-w-12 rounded-sm border px-3 py-2.5 text-[13.5px] transition",
                        size === option
                          ? "border-ink bg-ink text-ivory"
                          : "border-sand bg-white text-ink-soft hover:border-ink/40",
                      )}
                    >
                      {toBnDigits(option)}
                    </button>
                  ))}
                </div>
                {!size && (
                  <p className="mt-2 text-[12px] text-muted">
                    অর্ডার করার আগে সাইজ নির্বাচন করুন।
                  </p>
                )}
              </fieldset>
            )}

            {/* পরিমাণ + অ্যাকশন */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-[13.5px] font-semibold text-ink">পরিমাণ</span>
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                max={Math.max(product.stock, 1)}
              />
            </div>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-[1.4fr_1fr]">
              <Button size="lg" onClick={orderNow} disabled={outOfStock}>
                {outOfStock ? "স্টকে নেই" : "অর্ডার করুন"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => addToCart()}
                disabled={outOfStock}
              >
                কার্টে যোগ করুন
              </Button>
            </div>

            <div className="mt-2.5 grid gap-2.5 sm:grid-cols-[1.4fr_1fr]">
              <ButtonLink
                href={whatsappProductLink(product.name, product.sku)}
                variant="whatsapp"
                size="md"
                target="_blank"
              >
                <Icon name="whatsapp" size={17} />
                WhatsApp-এ অর্ডার করুন
              </ButtonLink>
              <WishlistButton slug={product.slug} name={product.name} variant="inline" />
            </div>

            {outOfStock && (
              <p className="mt-3 rounded-sm border border-maroon/20 bg-maroon-soft px-4 py-3 text-[13px] text-maroon">
                এই ডিজাইনটি এই মুহূর্তে স্টকে নেই। স্টকে এলে জানতে WhatsApp-এ মেসেজ দিন।
              </p>
            )}

            {/* ডেলিভারি ও সহায়তা */}
            <ul className="mt-6 grid gap-2.5 rounded-sm border border-line bg-white p-4 text-[13px] text-ink-soft sm:grid-cols-2">
              <li className="flex items-start gap-2.5">
                <Icon name="truck" size={17} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  ঢাকায় ৳{toBnDigits(siteConfig.delivery.insideDhaka)} ({siteConfig.delivery.insideDhakaTime}), ঢাকার
                  বাইরে ৳{toBnDigits(siteConfig.delivery.outsideDhaka)}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="shield" size={17} className="mt-0.5 shrink-0 text-gold" />
                <span>ক্যাশ অন ডেলিভারি—পণ্য দেখে মূল্য পরিশোধ</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="box" size={17} className="mt-0.5 shrink-0 text-gold" />
                <span>নিরাপদ প্যাকেজিং ও গিফট বক্স</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="support" size={17} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  {product.specs.warranty ?? "৬ মাস"} ওয়ারেন্টি ও বিক্রয়োত্তর সহায়তা
                </span>
              </li>
            </ul>

            {/* মূল স্পেসিফিকেশন */}
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-line pt-5 text-[13px] sm:grid-cols-3">
              {specRows.slice(0, 6).map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11.5px] uppercase tracking-wide text-muted">{label}</dt>
                  <dd className="mt-0.5 font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* মোবাইল স্টিকি অ্যাকশন বার */}
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/97 px-3 py-2.5 shadow-[0_-8px_24px_-18px_rgba(36,29,22,0.6)] backdrop-blur lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="min-w-0 pl-1">
            <p className="truncate text-[15px] font-semibold leading-tight text-ink">
              {formatPrice(product.price * quantity)}
            </p>
            {product.oldPrice && (
              <p className="text-[11px] text-muted line-through">
                {formatPrice(product.oldPrice * quantity)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => addToCart()}
            disabled={outOfStock}
            className="h-11 shrink-0 rounded-sm border border-sand px-3 text-[12.5px] font-medium text-ink disabled:opacity-50"
          >
            কার্টে
          </button>
          <button
            type="button"
            onClick={orderNow}
            disabled={outOfStock}
            className="h-11 flex-1 rounded-sm bg-gold text-[14px] font-semibold text-white disabled:bg-cream disabled:text-muted"
          >
            {outOfStock ? "স্টকে নেই" : "অর্ডার করুন"}
          </button>
        </div>
      </div>
      <div aria-hidden className="h-16 lg:hidden" />

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
