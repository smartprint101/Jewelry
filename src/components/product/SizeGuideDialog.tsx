"use client";

import { Drawer } from "@/components/ui/Drawer";
import { generalSizeGuide, ringSizeGuide, sizeGuideSteps } from "@/data/info";
import { toBnDigits } from "@/lib/format";
import type { SizeType } from "@/types";

interface SizeGuideDialogProps {
  open: boolean;
  onClose: () => void;
  type: SizeType;
}

export function SizeGuideDialog({ open, onClose, type }: SizeGuideDialogProps) {
  const isRing = type === "ring";
  const guide = generalSizeGuide[type];

  return (
    <Drawer
      open={open}
      onClose={onClose}
      side="center"
      title={isRing ? "রিং সাইজ গাইড" : (guide?.title ?? "সাইজ গাইড")}
    >
      <div className="px-5 py-5">
        <ol className="mb-5 space-y-2.5">
          {(isRing ? sizeGuideSteps : (guide?.steps ?? [])).map((step, index) => (
            <li key={step} className="flex gap-3 text-[13.5px] leading-relaxed text-ink-soft">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold-tint text-[11px] font-semibold text-gold">
                {["১", "২", "৩", "৪"][index]}
              </span>
              {step}
            </li>
          ))}
        </ol>

        {isRing && (
          <div className="overflow-hidden rounded-sm border border-line">
            <table className="w-full border-collapse text-[13px]">
              <caption className="sr-only">রিং সাইজ ও মাপের তালিকা</caption>
              <thead>
                <tr className="bg-cream text-left text-ink">
                  <th scope="col" className="px-3.5 py-2.5 font-semibold">
                    সাইজ
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-semibold">
                    ভেতরের ব্যাস
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-semibold">
                    পরিধি
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {ringSizeGuide.map((row) => (
                  <tr key={row.size}>
                    <td className="px-3.5 py-2 font-semibold text-ink">{toBnDigits(row.size)}</td>
                    <td className="px-3.5 py-2 text-ink-soft">{row.diameter}</td>
                    <td className="px-3.5 py-2 text-ink-soft">{row.circumference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 rounded-sm bg-gold-tint px-4 py-3 text-[12.5px] leading-relaxed text-ink-soft">
          নিশ্চিত না হলে চিন্তার কিছু নেই—অর্ডার করার পর আমাদের টিম ফোনে যোগাযোগ করে সাইজ
          নিশ্চিত করে নেয়।
        </p>
      </div>
    </Drawer>
  );
}
