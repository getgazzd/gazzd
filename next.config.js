/** @type {import('next').NextConfig} */

const moduleExports = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  images: {
    domains: [
      "localhost",
      "images.ctfassets.net",
      "gazzd.centraqa.com",
      "gazzd.centracdn.net",
    ],
  },
  i18n: {
    localeDetection: false,
    locales: ["en-US", "sv-SE"],
    defaultLocale: "sv-SE",
  },
};

module.exports = moduleExports;
