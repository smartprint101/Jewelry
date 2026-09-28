import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { careTips } from "@/data/info";

export function JewelryCare() {
  return (
    <section className="container-x py-12 md:py-16" aria-labelledby="care-heading">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line lg:aspect-[5/4]">
            <Image
              src="/brand/care.jpg"
              alt="গয়নার বক্স, নরম কাপড় ও সোনার চেইন—গয়নার যত্নের সরঞ্জাম"
              fill
              sizes="(max-width: 1023px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="eyebrow">যত্ন</p>
          <h2 id="care-heading" className="mt-2.5 text-[22px] text-ink md:text-[30px]">
            আপনার গয়নার যত্ন
          </h2>
          <p className="mt-2.5 max-w-lg text-[13.5px] leading-relaxed text-muted md:text-[15px]">
            সামান্য যত্নেই গয়না অনেক দিন নতুনের মতো থাকে। প্রতিদিনের কিছু অভ্যাস মেনে চললেই
            রঙ ও উজ্জ্বলতা দীর্ঘস্থায়ী হয়।
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {careTips.map((tip, index) => (
              <Reveal as="li" key={tip.step} delay={Math.min(index, 3) * 0.06}>
                <div className="h-full rounded-sm border border-line bg-white p-4">
                  <span className="text-display text-[15px] text-gold">{tip.step}</span>
                  <h3 className="mt-1.5 text-[14px] font-semibold leading-snug text-ink">
                    {tip.title}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{tip.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="mt-6">
            <ButtonLink href="/info/jewelry-care" variant="outline" size="md">
              যত্নের বিস্তারিত গাইড
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
