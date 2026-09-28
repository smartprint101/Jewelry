"use client";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { useToast } from "@/store/toast-context";
import { useWishlist } from "@/store/wishlist-context";

interface WishlistButtonProps {
  slug: string;
  name: string;
  className?: string;
  variant?: "floating" | "inline";
}

export function WishlistButton({
  slug,
  name,
  className,
  variant = "floating",
}: WishlistButtonProps) {
  const { has, toggle, hydrated } = useWishlist();
  const { toast } = useToast();
  const active = hydrated && has(slug);

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const added = toggle(slug);
    toast(
      added ? `“${name}” উইশলিস্টে যোগ হয়েছে।` : `“${name}” উইশলিস্ট থেকে সরানো হয়েছে।`,
      added ? "success" : "default",
    );
  };

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-sm border px-4 text-[14px] font-medium transition",
          active
            ? "border-maroon/30 bg-maroon-soft text-maroon"
            : "border-ink/20 text-ink hover:border-ink",
          className,
        )}
      >
        <Icon name={active ? "heart-filled" : "heart"} size={18} />
        {active ? "উইশলিস্টে আছে" : "উইশলিস্টে রাখুন"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? `${name} উইশলিস্ট থেকে সরান` : `${name} উইশলিস্টে যোগ করুন`}
      className={cn(
        "grid size-8 place-items-center rounded-full border border-line bg-white/90 backdrop-blur transition hover:border-maroon/40 hover:text-maroon md:size-9",
        active ? "text-maroon" : "text-ink-soft",
        className,
      )}
    >
      <Icon name={active ? "heart-filled" : "heart"} size={16} />
    </button>
  );
}
