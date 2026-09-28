import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** ডেমো প্রিভিউ (sandbox/টানেল) থেকে ডেভ সার্ভারে অ্যাক্সেসের অনুমতি */
  allowedDevOrigins: ["*.e2b.app", "*.vercel.app", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
