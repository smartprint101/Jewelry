"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

type Side = "left" | "right" | "bottom" | "center";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: Side;
  title?: string;
  /** হেডার লুকাতে চাইলে */
  hideHeader?: boolean;
  children: React.ReactNode;
  className?: string;
  /** নিচে আটকানো অ্যাকশন এরিয়া */
  footer?: React.ReactNode;
  labelledBy?: string;
}

const panelBySide: Record<Side, string> = {
  left: "inset-y-0 left-0 h-full w-[86%] max-w-sm animate-[var(--animate-fade-in)]",
  right: "inset-y-0 right-0 h-full w-[88%] max-w-md animate-[var(--animate-fade-in)]",
  bottom:
    "inset-x-0 bottom-0 max-h-[88vh] w-full rounded-t-xl animate-[var(--animate-sheet-up)] sm:inset-x-auto sm:left-1/2 sm:bottom-auto sm:top-1/2 sm:w-[min(32rem,92vw)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-sm sm:animate-[var(--animate-scale-in)]",
  center:
    "inset-x-0 bottom-0 max-h-[88vh] w-full rounded-t-xl animate-[var(--animate-sheet-up)] sm:inset-x-auto sm:left-1/2 sm:bottom-auto sm:top-1/2 sm:w-[min(40rem,92vw)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-sm sm:animate-[var(--animate-scale-in)]",
};

export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  hideHeader,
  children,
  className,
  footer,
  labelledBy,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const headingId = useId();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector<HTMLElement>(
        "[data-autofocus], button, a[href], input",
      );
      target?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="presentation">
      <div
        className="absolute inset-0 bg-ink/45 backdrop-blur-[2px] animate-[var(--animate-fade-in)]"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy ?? (title ? headingId : undefined)}
        className={cn(
          "absolute flex flex-col bg-ivory shadow-[var(--shadow-lift)] outline-none",
          panelBySide[side],
          className,
        )}
      >
        {!hideHeader && (
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
            <h2
              id={headingId}
              className="font-bangla-serif text-[17px] font-semibold text-ink"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="-mr-1.5 rounded-full p-2 text-ink-soft transition hover:bg-cream hover:text-ink"
            >
              <Icon name="close" size={18} label="বন্ধ করুন" />
            </button>
          </div>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer && (
          <div className="safe-bottom border-t border-line bg-ivory px-5 py-3.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
