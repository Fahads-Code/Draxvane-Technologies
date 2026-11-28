/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Every asset in /public is already a compressed WebP. Serving the original
    // bytes keeps the quality identical and skips the on-demand optimizer
    // round-trip, so images start loading immediately on first visit.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Serve cached images instantly on repeat visits, then refresh in the
        // background so a replaced file still goes live without a long wait.
        source: "/:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
