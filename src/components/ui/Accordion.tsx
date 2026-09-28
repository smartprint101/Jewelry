"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** শুরুতে যে আইটেমটি খোলা থাকবে */
  defaultOpen?: string;
  className?: string;
}

export function Accordion({ items, defaultOpen, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? null);
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${baseId}-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left transition hover:text-gold"
              >
                <span className="font-bangla-serif text-[15px] font-semibold leading-snug text-ink md:text-base">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border border-sand text-ink-soft transition-transform duration-200",
                    open && "rotate-180 border-gold/40 bg-gold-tint text-gold",
                  )}
                >
                  <Icon name="chevron-down" size={15} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              hidden={!open}
              className="pb-5 pr-8 text-[14px] leading-relaxed text-ink-soft"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
