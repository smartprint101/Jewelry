import { Icon } from "@/components/ui/Icon";
import { formatCount, formatRating } from "@/lib/format";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export function Rating({ value, count, size = 13, className, showValue = true }: RatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      aria-label={`রেটিং ${formatRating(value)}, ৫-এর মধ্যে`}
    >
      <span className="flex items-center gap-[1px] text-gold">
        {stars.map((star) => {
          const name =
            value >= star ? "star" : value >= star - 0.5 ? "star-half" : "star-outline";
          return <Icon key={star} name={name} size={size} />;
        })}
      </span>
      {showValue && (
        <span className="text-[12px] font-medium text-ink-soft">
          {formatRating(value)}
          {typeof count === "number" && (
            <span className="text-muted"> ({formatCount(count)})</span>
          )}
        </span>
      )}
    </div>
  );
}
