/** রুট পরিবর্তনের সময় হালকা স্কেলিটন—কোনো স্পিনার নয়, শান্ত উপস্থাপনা */
export default function Loading() {
  return (
    <div className="container-x py-10 md:py-14" aria-busy="true" aria-live="polite">
      <span className="sr-only">পেজ লোড হচ্ছে…</span>

      <div className="h-3.5 w-24 animate-pulse rounded-full bg-cream" />
      <div className="mt-4 h-7 w-2/3 max-w-md animate-pulse rounded-sm bg-cream md:h-9" />
      <div className="mt-3 h-3.5 w-full max-w-lg animate-pulse rounded-full bg-cream" />

      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="rounded-sm border border-line bg-white p-2.5 md:p-3.5">
            <div className="aspect-square animate-pulse rounded-sm bg-ivory-deep" />
            <div className="mt-3 h-2.5 w-1/2 animate-pulse rounded-full bg-cream" />
            <div className="mt-2 h-3.5 w-5/6 animate-pulse rounded-full bg-cream" />
            <div className="mt-2 h-3.5 w-1/3 animate-pulse rounded-full bg-cream" />
            <div className="mt-3 h-9 w-full animate-pulse rounded-sm bg-cream" />
          </div>
        ))}
      </div>
    </div>
  );
}
