"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { toBnDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-context";
import { useWishlist } from "@/store/wishlist-context";

function CountBadge({ value }: { value: number }) {
  if (value <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 grid min-w-[17px] place-items-center rounded-full bg-maroon px-1 text-[10px] font-semibold leading-[17px] text-white">
      {toBnDigits(value)}
    </span>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { count, hydrated } = useCart();
  const { count: wishCount, hydrated: wishHydrated } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ঘোষণা বার */}
      <div className="bg-ink text-ivory">
        <div className="container-x flex h-9 items-center justify-center gap-4 text-[11.5px] tracking-wide md:justify-between">
          <p className="truncate">
            সারা দেশে ক্যাশ অন ডেলিভারি • ঢাকায় ৳{toBnDigits(siteConfig.delivery.insideDhaka)} •
            ঢাকার বাইরে ৳{toBnDigits(siteConfig.delivery.outsideDhaka)}
          </p>
          <p className="hidden items-center gap-1.5 md:flex">
            <Icon name="phone" size={13} className="text-gold-light" />
            <a
              href={`tel:${siteConfig.contact.phoneIntl}`}
              className="transition hover:text-gold-light"
            >
              {siteConfig.contact.phone}
            </a>
          </p>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b border-line bg-ivory/95 backdrop-blur transition-shadow duration-300",
          scrolled && "shadow-[0_6px_24px_-18px_rgba(36,29,22,0.5)]",
        )}
      >
        <div className="container-x">
          <div className="flex h-14 items-center justify-between gap-3 lg:h-[72px]">
            {/* মোবাইল: হ্যামবার্গার */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="-ml-2 rounded-full p-2 text-ink transition hover:bg-cream lg:hidden"
              aria-expanded={menuOpen}
            >
              <Icon name="menu" size={21} label="মেনু খুলুন" />
            </button>

            <div className="flex items-center lg:flex-1">
              <Logo size="md" className="items-start" />
            </div>

            {/* ডেস্কটপ নেভিগেশন */}
            <nav aria-label="প্রধান মেনু" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative py-2 text-[14px] font-medium tracking-wide text-ink-soft transition-colors hover:text-ink",
                        isActive(item.href) && "text-ink",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-gold transition-transform duration-300",
                          isActive(item.href) && "scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* অ্যাকশন */}
            <div className="flex items-center gap-0.5 lg:flex-1 lg:justify-end">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="rounded-full p-2 text-ink transition hover:bg-cream"
              >
                <Icon name="search" size={20} label="খুঁজুন" />
              </button>

              <Link
                href="/wishlist"
                className="relative hidden rounded-full p-2 text-ink transition hover:bg-cream sm:block"
              >
                <Icon name="heart" size={20} label="উইশলিস্ট" />
                {wishHydrated && <CountBadge value={wishCount} />}
              </Link>

              <Link
                href="/cart"
                className="relative rounded-full p-2 text-ink transition hover:bg-cream"
              >
                <Icon name="bag" size={20} label="কার্ট" />
                {hydrated && <CountBadge value={count} />}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {searchOpen && <SearchOverlay open onClose={() => setSearchOpen(false)} />}
    </>
  );
}
