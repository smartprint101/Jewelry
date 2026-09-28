"use client";

import { Icon } from "@/components/ui/Icon";
import { toBnDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md";
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  size = "md",
}: QuantityStepperProps) {
  const dimension = size === "sm" ? "size-8" : "size-10";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border border-sand bg-white",
        className,
      )}
    >
      <button
        type="button"
        className={cn(
          dimension,
          "grid place-items-center text-ink-soft transition hover:text-gold disabled:opacity-35",
        )}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Icon name="minus" size={15} label="পরিমাণ কমান" />
      </button>
      <span
        className={cn(
          "min-w-9 text-center text-sm font-semibold tabular-nums text-ink",
          size === "sm" && "min-w-7 text-[13px]",
        )}
        aria-live="polite"
      >
        {toBnDigits(value)}
      </span>
      <button
        type="button"
        className={cn(
          dimension,
          "grid place-items-center text-ink-soft transition hover:text-gold disabled:opacity-35",
        )}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Icon name="plus" size={15} label="পরিমাণ বাড়ান" />
      </button>
    </div>
  );
}
