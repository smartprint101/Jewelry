import { Icon, type IconName } from "@/components/ui/Icon";
import { trustBarItems } from "@/data/info";

export function TrustBar() {
  return (
    <section aria-label="আমাদের প্রতিশ্রুতি" className="border-y border-line bg-cream/70">
      <div className="container-x">
        <ul className="grid grid-cols-2 divide-x divide-y divide-line/70 md:grid-cols-4 md:divide-y-0">
          {trustBarItems.map((item) => (
            <li
              key={item.title}
              className="flex items-center gap-3 px-3 py-4 first:border-l-0 md:justify-center md:px-4 md:py-5"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/25 bg-ivory text-gold md:size-10">
                <Icon name={item.icon as IconName} size={17} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[12.5px] font-semibold text-ink md:text-[13.5px]">
                  {item.title}
                </span>
                <span className="block truncate text-[11px] text-muted md:text-[12px]">
                  {item.note}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
