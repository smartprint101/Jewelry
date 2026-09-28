import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function EmptyState({
  icon = "bag",
  title,
  description,
  actionLabel,
  actionHref,
  secondaryLabel,
  secondaryHref,
}: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center md:py-24">
      <span className="grid size-16 place-items-center rounded-full border border-sand bg-cream text-gold">
        <Icon name={icon} size={26} />
      </span>
      <h2 className="mt-5 text-[19px] text-ink md:text-[22px]">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      {(actionHref || secondaryHref) && (
        <div className="mt-6 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
          {actionHref && actionLabel && (
            <ButtonLink href={actionHref} size="md">
              {actionLabel}
            </ButtonLink>
          )}
          {secondaryHref && secondaryLabel && (
            <ButtonLink href={secondaryHref} variant="outline" size="md">
              {secondaryLabel}
            </ButtonLink>
          )}
        </div>
      )}
    </div>
  );
}
