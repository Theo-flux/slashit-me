/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  //nextConfig,
  images: {
    domains: ['localhost', 'slashit.s3.amazonaws.com', "images.pexels.com"],
  },
};

//module.exports = nextConfig;
