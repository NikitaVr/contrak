/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@midna/db", "@midna/rest", "@midna/utils"],
};

module.exports = nextConfig;
