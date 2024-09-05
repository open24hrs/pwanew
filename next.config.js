/** @type {import('next').NextConfig} */

const NextConfig = {
  output: "standalone",
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== "production", // Enable PWA in production
});

module.exports = withPWA({
  reactStrictMode: true,
  // Add any other Next.js configuration options here
});