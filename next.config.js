/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/slack',
        destination: 'https://join.slack.com/t/json-schema/shared_invite/zt-2ued3v79g-Tk_aI32ZdW~ST0EWpGBwNQ',
        permanent: false,
      },
      {
        source: '/slack-redirect',
        destination: 'https://join.slack.com/t/json-schema/shared_invite/zt-2ued3v79g-Tk_aI32ZdW~ST0EWpGBwNQ',
        permanent: false,
      }
    ];
  },
  reactStrictMode: true,
  output: 'export',
  pageExtensions: ['page.tsx'],
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['next/babel'],
              plugins: ['istanbul'],
            },
          },
        ],
      });
    }

    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },

      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

module.exports = nextConfig;

