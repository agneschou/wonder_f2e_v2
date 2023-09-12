/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')

const nextConfig = {
  reactStrictMode: false,
}

module.exports = nextTranslate(nextConfig);
