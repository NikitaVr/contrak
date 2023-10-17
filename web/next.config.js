/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@contrak/db", "@contrak/rest", "@contrak/utils"],
};

module.exports = nextConfig;
