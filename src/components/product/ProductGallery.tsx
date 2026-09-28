"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  badge?: string;
}

export function ProductGallery({ images, alt, badge }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const scrollRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const node = scrollRef.current;
    if (!node) return;
    const index = Math.round(node.scrollLeft / node.clientWidth);
    setActive((current) => (current === index ? current : index));
  };

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div>
      {/* মোবাইল: সোয়াইপ গ্যালারি */}
      <div className="relative md:hidden">
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-sm border border-line bg-ivory-deep"
        >
          {images.map((image, index) => (
            <div key={image} className="relative aspect-square w-full shrink-0 snap-center">
              <Image
                src={image}
                alt={`${alt} — ছবি ${index + 1}`}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {badge && (
          <span className="absolute left-3 top-3 rounded-[2px] bg-maroon px-2 py-1 text-[11px] font-semibold text-white">
            {badge}
          </span>
        )}

        <div className="mt-3 flex items-center justify-center gap-1.5">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`ছবি ${index + 1} দেখুন`}
              aria-current={active === index}
              onClick={() => {
                const node = scrollRef.current;
                if (!node) return;
                node.scrollTo({ left: index * node.clientWidth, behavior: "smooth" });
              }}
              className={cn(
                "h-1.5 rounded-full transition-all",
                active === index ? "w-6 bg-gold" : "w-1.5 bg-sand",
              )}
            />
          ))}
        </div>
      </div>

      {/* ডেস্কটপ: থাম্বনেইল + জুম */}
      <div className="hidden gap-3 md:grid md:grid-cols-[74px_1fr]">
        <ul className="flex flex-col gap-2.5">
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`ছবি ${index + 1} দেখুন`}
                aria-current={active === index}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-sm border bg-ivory-deep transition",
                  active === index
                    ? "border-gold ring-1 ring-gold/30"
                    : "border-line hover:border-ink/30",
                )}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="74px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>

        <div
          className="relative aspect-square overflow-hidden rounded-sm border border-line bg-ivory-deep"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={onMouseMove}
        >
          <Image
            src={images[active] ?? images[0]}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1279px) 50vw, 42vw"
            style={{ transformOrigin: origin }}
            className={cn(
              "object-cover transition-transform duration-300 ease-out",
              zoom && "scale-[1.7]",
            )}
          />
          {badge && (
            <span className="absolute left-3 top-3 rounded-[2px] bg-maroon px-2 py-1 text-[11.5px] font-semibold text-white">
              {badge}
            </span>
          )}
          <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] text-ink-soft backdrop-blur">
            <Icon name="search" size={12} />
            জুম করতে মাউস রাখুন
          </span>
        </div>
      </div>
    </div>
  );
}
