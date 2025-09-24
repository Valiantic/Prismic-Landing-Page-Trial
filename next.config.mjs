/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.prismic.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: undefined,
  trailingSlash: false,
};

export default nextConfig;
