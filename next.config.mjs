/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
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
};

export default nextConfig;
