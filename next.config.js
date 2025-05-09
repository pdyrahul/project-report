/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'easydash.enago.com',
          pathname: '/uploads/**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  