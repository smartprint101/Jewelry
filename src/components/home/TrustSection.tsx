import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { trustPoints } from "@/data/info";

export function TrustSection() {
  return (
    <section className="bg-ivory-deep py-12 md:py-16">
      <div className="container-x">
        <SectionHeading
          eyebrow="কেন AURELIA"
          title="যে বিষয়গুলো আমরা নিশ্চিত করি"
          description="বাড়তি প্রতিশ্রুতি নয়—যা করা সম্ভব, সেটুকুই পরিষ্কারভাবে বলা।"
          align="center"
        />

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {trustPoints.map((point, index) => (
            <Reveal as="li" key={point.title} delay={Math.min(index, 5) * 0.05}>
              <div className="flex h-full gap-3.5 rounded-sm border border-line bg-white p-4 md:p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/20 bg-gold-tint text-gold">
                  <Icon name={point.icon as IconName} size={18} />
                </span>
                <span>
                  <span className="block font-bangla-serif text-[14.5px] font-semibold text-ink">
                    {point.title}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-relaxed text-muted">
                    {point.text}
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
