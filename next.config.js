/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  env: {
    IMAGE_ENDPOINT: 'https://slashit.s3-eu-west-1.amazonaws.com/',
    GRAPHQL_ENDPOINT: 'https://api-graphql-remote.herokuapp.com/graphql',
    CDN_URL: 'https://slashit.s3-eu-west-1.amazonaws.com/cdn/slashit.js',
    FLUTTERWAVE_KEY: 'a8320347943ce0cc0dfd5b94',
  },
  nextConfig,
};

//module.exports = nextConfig;
