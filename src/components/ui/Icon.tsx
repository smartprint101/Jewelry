import type { SVGProps } from "react";

export type IconName =
  | "search"
  | "heart"
  | "heart-filled"
  | "bag"
  | "menu"
  | "close"
  | "chevron-down"
  | "chevron-right"
  | "chevron-left"
  | "star"
  | "star-half"
  | "star-outline"
  | "whatsapp"
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "truck"
  | "shield"
  | "lock"
  | "support"
  | "check"
  | "check-circle"
  | "box"
  | "certificate"
  | "list"
  | "filter"
  | "sort"
  | "plus"
  | "minus"
  | "trash"
  | "facebook"
  | "instagram"
  | "youtube"
  | "arrow-right"
  | "gift"
  | "sparkle"
  | "ruler"
  | "info";

const paths: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.3-7.5-9.3A4.2 4.2 0 0 1 12 8.2a4.2 4.2 0 0 1 7.5 2.5c0 5-7.5 9.3-7.5 9.3Z" />
  ),
  "heart-filled": (
    <path
      d="M12 20s-7.5-4.3-7.5-9.3A4.2 4.2 0 0 1 12 8.2a4.2 4.2 0 0 1 7.5 2.5c0 5-7.5 9.3-7.5 9.3Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  bag: (
    <>
      <path d="M5.5 8h13l1 12h-15l1-12Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  "chevron-left": <path d="m15 6-6 6 6 6" />,
  star: (
    <path
      d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9L12 3.6Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  "star-half": (
    <>
      <path
        d="M12 3.6v13.4l-5.2 2.7 1-5.8L3.5 9.8l5.9-.9L12 3.6Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9L12 3.6Z"
        strokeWidth="1.2"
      />
    </>
  ),
  "star-outline": (
    <path
      d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9L12 3.6Z"
      strokeWidth="1.2"
    />
  ),
  whatsapp: (
    <path
      d="M12.04 2.5a9.42 9.42 0 0 0-8.1 14.2L2.5 21.5l4.95-1.38A9.42 9.42 0 1 0 12.04 2.5Zm5.5 13.36c-.23.65-1.36 1.26-1.87 1.3-.5.05-.96.24-3.25-.68-2.74-1.1-4.46-3.9-4.6-4.08-.13-.18-1.1-1.46-1.1-2.79 0-1.32.7-1.97.94-2.24a1 1 0 0 1 .72-.34h.52c.17 0 .39-.06.6.46l.83 2c.07.14.11.3.02.48l-.31.5-.45.5c-.14.14-.29.3-.12.58.16.28.73 1.2 1.56 1.94 1.08.96 1.98 1.26 2.26 1.4.28.15.45.13.61-.08.17-.2.7-.81.89-1.1.19-.27.37-.22.62-.13l1.78.84c.26.13.43.19.5.3.06.1.06.63-.17 1.24Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.3a12 12 0 0 0 5.2 5.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-5.5 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.5 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 7.5h11v9h-11z" />
      <path d="M13.5 11h4l3 3v2.5h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 5.5 5.8v5.3c0 4 2.8 7.5 6.5 9 3.7-1.5 6.5-5 6.5-9V5.8L12 3.2Z" />
      <path d="m9.3 11.8 1.9 1.9 3.6-3.7" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="1.6" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  support: (
    <>
      <path d="M4.5 13.5v-1.8a7.5 7.5 0 0 1 15 0v1.8" />
      <rect x="3" y="13" width="3.6" height="5.5" rx="1.4" />
      <rect x="17.4" y="13" width="3.6" height="5.5" rx="1.4" />
      <path d="M19 18.5v.7a2.3 2.3 0 0 1-2.3 2.3H13" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.2 12.3 2.6 2.6 5-5.2" />
    </>
  ),
  box: (
    <>
      <path d="M12 3.5 4.5 7v10l7.5 3.5 7.5-3.5V7L12 3.5Z" />
      <path d="M4.5 7 12 10.5 19.5 7" />
      <path d="M12 10.5v10" />
    </>
  ),
  certificate: (
    <>
      <rect x="4" y="3.5" width="16" height="12" rx="1.5" />
      <path d="M8 7.5h8M8 11h5" />
      <path d="m9 15.5-1 5 4-2 4 2-1-5" />
    </>
  ),
  list: (
    <>
      <path d="M4 7h16M4 12h16M4 17h11" strokeDasharray="0" />
    </>
  ),
  filter: (
    <>
      <path d="M4 6.5h16l-6.2 7v5l-3.6 1.8v-6.8L4 6.5Z" />
    </>
  ),
  sort: (
    <>
      <path d="M7 4.5v15M7 19.5 4 16.5M7 19.5l3-3" />
      <path d="M17 19.5v-15M17 4.5l-3 3M17 4.5l3 3" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5.5v13" />
      <path d="M5.5 12h13" />
    </>
  ),
  minus: <path d="M5.5 12h13" />,
  trash: (
    <>
      <path d="M4.5 6.5h15" />
      <path d="M9 6.5V4.8A1.3 1.3 0 0 1 10.3 3.5h3.4A1.3 1.3 0 0 1 15 4.8v1.7" />
      <path d="M6.5 6.5 7.4 20a1.4 1.4 0 0 0 1.4 1.3h6.4a1.4 1.4 0 0 0 1.4-1.3l.9-13.5" />
    </>
  ),
  facebook: (
    <path
      d="M14.5 8.5h2.2V5.6c-.4-.05-1.6-.15-3-.15-2.98 0-5 1.8-5 5.1v2.6H6v3.3h2.7v8.05h3.3V16.4h2.8l.4-3.3h-3.2v-2.3c0-.95.26-1.6 1.6-1.6Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3.5" />
      <path d="m10.5 9.8 4.2 2.2-4.2 2.2z" fill="currentColor" stroke="none" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4.5 12h15" />
      <path d="m14 6.5 5.5 5.5L14 17.5" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="8.5" width="17" height="4" rx="1" />
      <path d="M5 12.5v7.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7.5" />
      <path d="M12 8.5v12.5" />
      <path d="M12 8.5S10.8 4 8.8 4a2 2 0 0 0 0 4.5H12Zm0 0S13.2 4 15.2 4a2 2 0 0 1 0 4.5H12Z" />
    </>
  ),
  sparkle: (
    <path d="M12 3.5c.6 3.9 1.6 4.9 5.5 5.5-3.9.6-4.9 1.6-5.5 5.5-.6-3.9-1.6-4.9-5.5-5.5 3.9-.6 4.9-1.6 5.5-5.5ZM18 15c.3 1.9.8 2.4 2.7 2.7-1.9.3-2.4.8-2.7 2.7-.3-1.9-.8-2.4-2.7-2.7 1.9-.3 2.4-.8 2.7-2.7Z" />
  ),
  ruler: (
    <>
      <rect x="2.8" y="8.5" width="18.4" height="7" rx="1.2" transform="rotate(-6 12 12)" />
      <path d="M7 9.4v2.2M10.4 9v2.9M13.8 8.6v2.2M17.2 8.2v2.9" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.2" />
      <circle cx="12" cy="8.2" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  /** স্ক্রিন-রিডারের জন্য লেবেল; না দিলে আইকনটি decorative ধরা হয় */
  label?: string;
  size?: number;
}

export function Icon({ name, label, size = 20, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
