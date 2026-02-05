/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set the correct root directory for Turbopack
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
