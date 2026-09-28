import Image from "next/image";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
  image?: string;
  meta?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  meta,
}: PageHeaderProps) {
  if (image) {
    return (
      <section className="relative overflow-hidden border-b border-line bg-ink">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/35"
        />
        <div className="container-x relative py-10 md:py-16">
          <Breadcrumbs items={crumbs} tone="light" />
          {eyebrow && <p className="eyebrow mt-4 text-gold-light">{eyebrow}</p>}
          <h1 className="mt-2 text-[26px] leading-tight text-ivory md:text-[38px]">{title}</h1>
          {description && (
            <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-ivory/75 md:text-[15px]">
              {description}
            </p>
          )}
          {meta && <p className="mt-3 text-[12.5px] text-gold-light">{meta}</p>}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-line bg-ivory-deep">
      <div className="container-x py-8 md:py-12">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mt-4">{eyebrow}</p>}
        <h1 className="mt-2 text-[24px] leading-tight text-ink md:text-[34px]">{title}</h1>
        {description && (
          <p className="mt-2.5 max-w-2xl text-[13.5px] leading-relaxed text-muted md:text-[15px]">
            {description}
          </p>
        )}
        {meta && <p className="mt-3 text-[12.5px] text-gold">{meta}</p>}
      </div>
    </section>
  );
}
