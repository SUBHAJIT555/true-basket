const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  turbopack: {
    root: path.join(__dirname),
  },
  // reactStrictMode: true,
  images: {
    unoptimized: true,   // 🔥 REQUIRED for static export
  },
  async rewrites() {
    if (process.env.NODE_ENV !== 'development') {
      return { beforeFiles: [], afterFiles: [], fallback: [] }
    }

    return {
      beforeFiles: [
        {
          source: '/api/submit.php',
          destination: 'http://localhost/ecom/api/submit.php',
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

module.exports = nextConfig