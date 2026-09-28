"use client";

import { Icon } from "@/components/ui/Icon";
import { categories, materials } from "@/data/categories";
import { budgetRanges, collections } from "@/data/collections";
import { products as allProducts } from "@/data/products";
import { toBnDigits } from "@/lib/format";
import { colorOptions, stoneOptions, type FilterState } from "@/lib/filters";
import { cn } from "@/lib/utils";

type ListKey = "category" | "material" | "collection" | "color" | "size" | "stone" | "budget";

interface FilterControlsProps {
  filters: FilterState;
  onToggle: (key: ListKey, value: string) => void;
  onStockChange: (value: boolean) => void;
  onClear: () => void;
  /** ক্যাটাগরি/কালেকশন পেজে যে ফিল্টারটি স্থির */
  locked?: ListKey;
}

const sizeGroups = (() => {
  const groups: Record<string, Set<string>> = {};
  allProducts.forEach((product) => {
    if (!product.size) return;
    const label =
      product.size.type === "ring"
        ? "রিং সাইজ"
        : product.size.type === "chain"
          ? "চেইনের দৈর্ঘ্য"
          : product.size.type === "bangle"
            ? "চুড়ির সাইজ"
            : product.size.type === "bracelet"
              ? "ব্রেসলেট সাইজ"
              : "অ্যাঙ্কলেট সাইজ";
    groups[label] = groups[label] ?? new Set<string>();
    product.size.options.forEach((option) => groups[label].add(option));
  });
  return Object.entries(groups).map(([label, values]) => ({
    label,
    values: [...values],
  }));
})();

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-line py-3.5 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between text-[13.5px] font-semibold text-ink marker:hidden">
        {title}
        <Icon
          name="chevron-down"
          size={15}
          className="text-muted transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="pt-3">{children}</div>
    </details>
  );
}

function CheckItem({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-[13px] text-ink-soft transition hover:text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "grid size-[17px] shrink-0 place-items-center rounded-[3px] border transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
          checked ? "border-gold bg-gold text-white" : "border-sand bg-white",
        )}
      >
        {checked && <Icon name="check" size={12} strokeWidth={2.5} />}
      </span>
      <span className="flex-1">{label}</span>
      {typeof count === "number" && (
        <span className="text-[11px] text-muted">{toBnDigits(count)}</span>
      )}
    </label>
  );
}

function Chip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-sm border px-2.5 py-1.5 text-[12.5px] transition",
        active
          ? "border-ink bg-ink text-ivory"
          : "border-sand bg-white text-ink-soft hover:border-ink/40",
      )}
    >
      {label}
    </button>
  );
}

export function FilterControls({
  filters,
  onToggle,
  onStockChange,
  onClear,
  locked,
}: FilterControlsProps) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-line pb-3">
        <p className="text-[13.5px] font-semibold text-ink">ফিল্টার</p>
        <button
          type="button"
          onClick={onClear}
          className="text-[12px] text-gold underline underline-offset-4 transition hover:text-gold-dark"
        >
          সব মুছুন
        </button>
      </div>

      {locked !== "category" && (
        <Section title="গয়নার ধরন">
          <div className="max-h-56 space-y-0 overflow-y-auto pr-1">
            {categories.map((category) => (
              <CheckItem
                key={category.slug}
                label={category.name}
                checked={filters.category.includes(category.slug)}
                onChange={() => onToggle("category", category.slug)}
                count={
                  allProducts.filter((product) => product.category === category.slug).length
                }
              />
            ))}
          </div>
        </Section>
      )}

      <Section title="ম্যাটেরিয়াল">
        {materials.map((material) => (
          <CheckItem
            key={material.slug}
            label={material.name}
            checked={filters.material.includes(material.slug)}
            onChange={() => onToggle("material", material.slug)}
            count={
              allProducts.filter((product) => product.materials.includes(material.slug)).length
            }
          />
        ))}
      </Section>

      <Section title="দাম">
        {budgetRanges.map((range) => (
          <CheckItem
            key={range.slug}
            label={range.label}
            checked={filters.budget.includes(range.slug)}
            onChange={() => onToggle("budget", range.slug)}
          />
        ))}
      </Section>

      {locked !== "collection" && (
        <Section title="কালেকশন" defaultOpen={false}>
          {collections.map((collection) => (
            <CheckItem
              key={collection.slug}
              label={collection.name}
              checked={filters.collection.includes(collection.slug)}
              onChange={() => onToggle("collection", collection.slug)}
            />
          ))}
        </Section>
      )}

      <Section title="রঙ" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <Chip
              key={color}
              label={color}
              active={filters.color.includes(color)}
              onClick={() => onToggle("color", color)}
            />
          ))}
        </div>
      </Section>

      <Section title="স্টোন" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {stoneOptions.map((stone) => (
            <Chip
              key={stone}
              label={stone}
              active={filters.stone.includes(stone)}
              onClick={() => onToggle("stone", stone)}
            />
          ))}
        </div>
      </Section>

      <Section title="সাইজ" defaultOpen={false}>
        <div className="space-y-3.5">
          {sizeGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 text-[11.5px] uppercase tracking-wide text-muted">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.values.map((value) => (
                  <Chip
                    key={`${group.label}-${value}`}
                    label={toBnDigits(value)}
                    active={filters.size.includes(value)}
                    onClick={() => onToggle("size", value)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="স্টক">
        <CheckItem
          label="শুধু স্টকে আছে এমন পণ্য"
          checked={filters.inStock}
          onChange={() => onStockChange(!filters.inStock)}
        />
      </Section>
    </div>
  );
}
