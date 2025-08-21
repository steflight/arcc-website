/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configuration pour éviter les erreurs de build avec l'export statique
  serverExternalPackages: [],
}

module.exports = nextConfig
