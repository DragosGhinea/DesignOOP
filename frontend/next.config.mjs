/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
      },
      async redirects() {
        return [
          {
            source: '/discord',
            destination: 'https://discord.gg/x4NmK9bebd',
            permanent: false,
          },
        ]
      }
};

export default nextConfig;
