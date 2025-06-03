/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
      {
        protocol: 'https',
        hostname: 'readdy.ai',
      },]
    }
};

export default nextConfig;
