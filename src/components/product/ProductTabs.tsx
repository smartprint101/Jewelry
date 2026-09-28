"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import { careTips } from "@/data/info";
import { toBnDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const tabs = [
  { id: "description", label: "বিবরণ" },
  { id: "specs", label: "পণ্যের তথ্য" },
  { id: "care", label: "গয়নার যত্ন" },
  { id: "delivery", label: "ডেলিভারি ও রিটার্ন" },
  { id: "warranty", label: "ওয়ারেন্টি" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<TabId>("description");

  const specRows = [
    ["ধাতু", product.specs.metal],
    ["গোল্ড ক্যারেট", product.specs.karat],
    ["ওজন", product.specs.weight],
    ["স্টোন", product.specs.stone],
    ["স্টোনের ধরন", product.specs.stoneType],
    ["রঙ", product.specs.color],
    ["সাইজ", product.size?.options.map((option) => toBnDigits(option)).join(", ")],
    ["চেইনের দৈর্ঘ্য", product.specs.chainLength],
    ["ব্রেসলেট সাইজ", product.specs.braceletSize],
    ["পণ্যের মাত্রা", product.specs.dimensions],
    ["পলিশ", product.specs.polish],
    ["লক/ক্লোজার", product.specs.closure],
    ["পিস", product.specs.pieces],
    ["সার্টিফিকেট", product.specs.certificate],
    ["ওয়ারেন্টি", product.specs.warranty],
    ["SKU", product.sku],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <section className="container-x py-10 md:py-14" aria-label="পণ্যের বিস্তারিত তথ্য">
      <div className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto border-b border-line px-4 md:mx-0 md:px-0">
        <div role="tablist" aria-label="পণ্যের তথ্য" className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={active === tab.id}
              aria-controls={`panel-${tab.id}`}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "shrink-0 whitespace-nowrap border-b-2 px-3.5 py-3 text-[13.5px] font-medium transition md:text-[14.5px]",
                active === tab.id
                  ? "border-gold text-ink"
                  : "border-transparent text-muted hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6">
        {active === "description" && (
          <div
            role="tabpanel"
            id="panel-description"
            aria-labelledby="tab-description"
            className="grid gap-6 lg:grid-cols-[1.6fr_1fr]"
          >
            <div>
              <p className="text-[14px] leading-[1.9] text-ink-soft md:text-[15px]">
                {product.description}
              </p>
            </div>
            <ul className="space-y-2.5 rounded-sm border border-line bg-white p-4 md:p-5">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5 text-[13.5px] text-ink-soft">
                  <Icon name="check-circle" size={17} className="mt-0.5 shrink-0 text-gold" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "specs" && (
          <div role="tabpanel" id="panel-specs" aria-labelledby="tab-specs">
            <dl className="grid gap-x-8 sm:grid-cols-2">
              {specRows.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 border-b border-line py-2.5 text-[13.5px]"
                >
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-right font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[12px] text-muted">
              * ওজন ও মাপে সামান্য তারতম্য হতে পারে (±৫%)—হাতে তৈরি গয়নার ক্ষেত্রে এটি স্বাভাবিক।
            </p>
          </div>
        )}

        {active === "care" && (
          <div
            role="tabpanel"
            id="panel-care"
            aria-labelledby="tab-care"
            className="grid gap-3 sm:grid-cols-2"
          >
            {careTips.map((tip) => (
              <div key={tip.step} className="rounded-sm border border-line bg-white p-4">
                <h3 className="text-[14px] font-semibold text-ink">{tip.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{tip.text}</p>
              </div>
            ))}
          </div>
        )}

        {active === "delivery" && (
          <div
            role="tabpanel"
            id="panel-delivery"
            aria-labelledby="tab-delivery"
            className="grid gap-6 md:grid-cols-2"
          >
            <div>
              <h3 className="text-[15px] font-semibold text-ink">ডেলিভারি</h3>
              <ul className="mt-3 space-y-2 text-[13.5px] text-ink-soft">
                <li className="flex items-center justify-between border-b border-line pb-2">
                  <span>{siteConfig.delivery.insideDhakaLabel}</span>
                  <span className="font-medium">
                    ৳{toBnDigits(siteConfig.delivery.insideDhaka)} • {siteConfig.delivery.insideDhakaTime}
                  </span>
                </li>
                <li className="flex items-center justify-between border-b border-line pb-2">
                  <span>{siteConfig.delivery.outsideDhakaLabel}</span>
                  <span className="font-medium">
                    ৳{toBnDigits(siteConfig.delivery.outsideDhaka)} • {siteConfig.delivery.outsideDhakaTime}
                  </span>
                </li>
                <li className="text-[12.5px] text-muted">
                  ৳{toBnDigits(siteConfig.delivery.freeDeliveryAbove)}+ অর্ডারে ডেলিভারি ফ্রি (ডেমো অফার)।
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-ink">রিটার্ন ও এক্সচেঞ্জ</h3>
              <ul className="mt-3 space-y-2 text-[13.5px] text-ink-soft">
                <li className="flex items-start gap-2.5">
                  <Icon name="check" size={16} className="mt-0.5 shrink-0 text-gold" />
                  ডেলিভারির সময় পণ্য দেখে নেওয়ার সুযোগ।
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="check" size={16} className="mt-0.5 shrink-0 text-gold" />
                  {toBnDigits(siteConfig.policy.exchangeDays)} দিনের মধ্যে অব্যবহৃত অবস্থায় সাইজ পরিবর্তন।
                </li>
                <li className="flex items-start gap-2.5">
                  <Icon name="info" size={16} className="mt-0.5 shrink-0 text-muted" />
                  স্বাস্থ্যগত কারণে নোজ পিন ও ইয়াররিং এক্সচেঞ্জযোগ্য নয়।
                </li>
              </ul>
            </div>
          </div>
        )}

        {active === "warranty" && (
          <div
            role="tabpanel"
            id="panel-warranty"
            aria-labelledby="tab-warranty"
            className="max-w-2xl"
          >
            <div className="rounded-sm border border-gold/25 bg-gold-tint p-4 md:p-5">
              <h3 className="text-[15px] font-semibold text-ink">
                এই পণ্যের ওয়ারেন্টি: {product.specs.warranty ?? "৬ মাস"}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                ওয়ারেন্টি সেবা নিতে অর্ডার আইডি ও পণ্যের ছবিসহ WhatsApp-এ (
                {siteConfig.whatsapp.displayNumber}) যোগাযোগ করুন।
              </p>
            </div>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-ink-soft">
              <li className="flex items-start gap-2.5">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-gold" />
                গোল্ড-প্লেটেড পণ্যে ৬ মাসের কালার গ্যারান্টি—স্বাভাবিক ব্যবহারে প্লেটিং উঠলে রি-প্লেটিং।
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-gold" />
                গোল্ড ও ডায়মন্ড পণ্যে ফ্রি পলিশ ও সাধারণ মেরামত।
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="info" size={16} className="mt-0.5 shrink-0 text-muted" />
                দুর্ঘটনাজনিত ভাঙা বা রাসায়নিকজনিত ক্ষতি ওয়ারেন্টির আওতার বাইরে।
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
