/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  redirects: async () => [
    {
      source: "/",
      destination: "/month-view",
      permanent: false,
    },
  ],
};

export default nextConfig;
