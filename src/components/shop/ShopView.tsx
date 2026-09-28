"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { FilterControls } from "@/components/shop/FilterControls";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { categories, materials } from "@/data/categories";
import { budgetRanges, collections } from "@/data/collections";
import { toBnDigits } from "@/lib/format";
import {
  applyFilters,
  countActiveFilters,
  emptyFilters,
  filtersFromParams,
  paramsFromFilters,
  sortOptions,
  type FilterState,
  type SortKey,
} from "@/lib/filters";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

type ListKey = "category" | "material" | "collection" | "color" | "size" | "stone" | "budget";

interface ShopViewProps {
  products: Product[];
  /** ক্যাটাগরি বা কালেকশন পেজে ফিল্টার সাইডবারে যেটি লুকানো থাকবে */
  locked?: ListKey;
}

function labelFor(key: ListKey, value: string): string {
  switch (key) {
    case "category":
      return categories.find((item) => item.slug === value)?.name ?? value;
    case "material":
      return materials.find((item) => item.slug === value)?.name ?? value;
    case "collection":
      return collections.find((item) => item.slug === value)?.name ?? value;
    case "budget":
      return budgetRanges.find((item) => item.slug === value)?.label ?? value;
    default:
      return value;
  }
}

export function ShopView({ products, locked }: ShopViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filters = useMemo(
    () => filtersFromParams(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const update = useCallback(
    (next: FilterState) => {
      const params = paramsFromFilters(next);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const onToggle = useCallback(
    (key: ListKey, value: string) => {
      const current = filters[key];
      const nextValues = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      update({ ...filters, [key]: nextValues });
    },
    [filters, update],
  );

  const onStockChange = useCallback(
    (value: boolean) => update({ ...filters, inStock: value }),
    [filters, update],
  );

  const onClear = useCallback(
    () => update({ ...emptyFilters, q: filters.q, sort: filters.sort }),
    [filters.q, filters.sort, update],
  );

  const onSort = useCallback(
    (sort: SortKey) => update({ ...filters, sort }),
    [filters, update],
  );

  const results = useMemo(() => applyFilters(products, filters), [products, filters]);
  const activeCount = countActiveFilters(filters, locked);

  const activeChips = (
    ["category", "material", "collection", "budget", "color", "stone", "size"] as ListKey[]
  )
    .filter((key) => key !== locked)
    .flatMap((key) =>
      filters[key].map((value) => ({ key, value, label: labelFor(key, value) })),
    );

  const sortSelect = (
    <label className="flex items-center gap-2 text-[12.5px] text-muted">
      <span className="hidden sm:inline">সাজান</span>
      <span className="relative">
        <select
          value={filters.sort}
          onChange={(event) => onSort(event.target.value as SortKey)}
          aria-label="সাজানোর ক্রম"
          className="h-10 appearance-none rounded-sm border border-sand bg-white pl-3 pr-8 text-[13px] text-ink outline-none transition focus:border-gold"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={14}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
        />
      </span>
    </label>
  );

  return (
    <div className="container-x pb-14">
      <div className="lg:grid lg:grid-cols-[250px_1fr] lg:gap-10">
        {/* ডেস্কটপ সাইডবার */}
        <aside className="hidden lg:block">
          <div className="sticky top-[104px] max-h-[calc(100vh-130px)] overflow-y-auto pr-2">
            <FilterControls
              filters={filters}
              onToggle={onToggle}
              onStockChange={onStockChange}
              onClear={onClear}
              locked={locked}
            />
          </div>
        </aside>

        <div>
          {/* টুলবার */}
          <div className="sticky top-[56px] z-30 -mx-4 mb-4 border-b border-line bg-ivory/95 px-4 py-2.5 backdrop-blur lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-sm border border-sand bg-white px-3.5 text-[13px] font-medium text-ink transition hover:border-ink lg:hidden"
              >
                <Icon name="filter" size={16} />
                ফিল্টার
                {activeCount > 0 && (
                  <span className="grid size-5 place-items-center rounded-full bg-gold text-[10.5px] font-semibold text-white">
                    {toBnDigits(activeCount)}
                  </span>
                )}
              </button>

              <p className="hidden text-[13px] text-muted lg:block">
                <span className="font-semibold text-ink">{toBnDigits(results.length)}</span>টি
                পণ্য পাওয়া গেছে
              </p>

              {sortSelect}
            </div>
          </div>

          <p className="mb-3 text-[12.5px] text-muted lg:hidden">
            <span className="font-semibold text-ink">{toBnDigits(results.length)}</span>টি পণ্য
          </p>

          {/* অ্যাক্টিভ ফিল্টার */}
          {(activeChips.length > 0 || filters.inStock) && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {activeChips.map((chip) => (
                <button
                  key={`${chip.key}-${chip.value}`}
                  type="button"
                  onClick={() => onToggle(chip.key, chip.value)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-sand bg-white py-1 pl-3 pr-2 text-[12px] text-ink-soft transition hover:border-maroon/40 hover:text-maroon"
                >
                  {chip.label}
                  <Icon name="close" size={12} label={`${chip.label} ফিল্টার সরান`} />
                </button>
              ))}
              {filters.inStock && (
                <button
                  type="button"
                  onClick={() => onStockChange(false)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-sand bg-white py-1 pl-3 pr-2 text-[12px] text-ink-soft transition hover:border-maroon/40 hover:text-maroon"
                >
                  স্টকে আছে
                  <Icon name="close" size={12} label="স্টক ফিল্টার সরান" />
                </button>
              )}
              <button
                type="button"
                onClick={onClear}
                className="text-[12px] text-gold underline underline-offset-4"
              >
                সব মুছুন
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <EmptyState
              icon="search"
              title="কোনো পণ্য পাওয়া যায়নি"
              description="ফিল্টার কিছুটা কমিয়ে আবার চেষ্টা করুন, অথবা সব গয়না ঘুরে দেখুন।"
              actionLabel="ফিল্টার মুছুন"
              actionHref={pathname}
              secondaryLabel="সব গয়না"
              secondaryHref="/shop"
            />
          ) : (
            <ProductGrid products={results} priorityCount={4} animate={false} />
          )}
        </div>
      </div>

      {/* মোবাইল ফিল্টার ড্রয়ার */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        side="left"
        title="ফিল্টার"
        footer={
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => {
                onClear();
                setDrawerOpen(false);
              }}
              className="h-11 flex-1 rounded-sm border border-sand text-[14px] font-medium text-ink-soft"
            >
              মুছুন
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="h-11 flex-[1.6] rounded-sm bg-gold text-[14px] font-semibold text-white"
            >
              {toBnDigits(results.length)}টি পণ্য দেখুন
            </button>
          </div>
        }
      >
        <div className={cn("px-5 py-3")}>
          <FilterControls
            filters={filters}
            onToggle={onToggle}
            onStockChange={onStockChange}
            onClear={onClear}
            locked={locked}
          />
        </div>
      </Drawer>
    </div>
  );
}
