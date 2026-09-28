"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { formatPrice, toBnDigits } from "@/lib/format";
import { popularSearches, searchProducts, searchSuggestions } from "@/lib/search";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const results = useMemo(() => searchProducts(query, 6), [query]);
  const suggestions = useMemo(() => searchSuggestions(query, 4), [query]);
  const totalResults = useMemo(() => searchProducts(query).length, [query]);

  if (!open) return null;

  const submit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onClose();
    router.push(`/shop?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div
      className="fixed inset-0 z-[75] flex flex-col bg-ivory md:bg-ink/40 md:backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="গয়না খুঁজুন"
    >
      <button
        type="button"
        aria-label="সার্চ বন্ধ করুন"
        onClick={onClose}
        className="absolute inset-0 hidden md:block"
        tabIndex={-1}
      />

      <div className="relative z-10 mx-auto flex h-full w-full flex-col bg-ivory md:mt-20 md:h-auto md:max-h-[76vh] md:w-[min(46rem,92vw)] md:rounded-sm md:border md:border-line md:shadow-[var(--shadow-lift)]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(query);
          }}
          className="flex items-center gap-2 border-b border-line px-4 py-3 md:px-5"
        >
          <Icon name="search" size={19} className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="রিং, নেকলেস, গোল্ড, ডায়মন্ড…"
            aria-label="গয়না খুঁজুন"
            className="h-9 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-muted/80"
          />
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 shrink-0 rounded-full p-2 text-ink-soft transition hover:bg-cream hover:text-ink"
          >
            <Icon name="close" size={18} label="বন্ধ করুন" />
          </button>
        </form>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-5">
          {query.trim().length === 0 ? (
            <div>
              <p className="eyebrow mb-3">জনপ্রিয় খোঁজ</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => submit(item)}
                    className="rounded-full border border-sand bg-white px-3.5 py-1.5 text-[13px] text-ink-soft transition hover:border-gold hover:text-gold"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-[15px] font-medium text-ink">
                “{query}” — এর জন্য কিছু পাওয়া যায়নি।
              </p>
              <p className="mt-1.5 text-[13px] text-muted">
                বানান পরীক্ষা করুন অথবা অন্য শব্দ দিয়ে খুঁজুন—যেমন রিং, নেকলেস, গোল্ড।
              </p>
              <Link
                href="/shop"
                onClick={onClose}
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-gold underline underline-offset-4"
              >
                সব গয়না দেখুন
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="rounded-full border border-sand bg-white px-3 py-1.5 text-[12.5px] text-ink-soft transition hover:border-gold hover:text-gold"
                    >
                      <span className="text-muted">{item.type}:</span> {item.label}
                    </Link>
                  ))}
                </div>
              )}

              <ul className="divide-y divide-line">
                {results.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 py-2.5 transition hover:bg-cream/60"
                    >
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-sm border border-line bg-white">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium text-ink">
                          {product.name}
                        </span>
                        <span className="block text-[12px] text-muted">{product.sku}</span>
                      </span>
                      <span className="shrink-0 text-[14px] font-semibold text-ink">
                        {formatPrice(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => submit(query)}
                className="flex w-full items-center justify-center gap-1.5 rounded-sm border border-sand bg-white py-2.5 text-[13.5px] font-medium text-ink transition hover:border-gold hover:text-gold"
              >
                সব ফলাফল দেখুন
                <Icon name="arrow-right" size={15} />
              </button>
              <p className="pb-2 text-center text-[12px] text-muted">
                মোট {toBnDigits(totalResults)}টি পণ্য মিলেছে
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
