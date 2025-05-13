/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
        esmExternals: "loose",
      },
      webpack(config) {
        config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
        }
        return config
      },
      images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "robohash.org",
            },
        ],
        minimumCacheTTL: 15000000,
    },
    reactStrictMode: false
};

export default nextConfig;
