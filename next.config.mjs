/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
          "platform-lookaside.fbsbx.com",
          "lh3.googleusercontent.com"
        ],
    },
    env: {
      BASE_URL: process.env.BASE_URL,
    }
};

export default nextConfig;
