/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppression de l'export statique pour permettre les API routes
  // output: 'export', // Commenté pour permettre les API routes
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configuration pour le déploiement avec API
  serverExternalPackages: ['openai'],
  // Configuration pour éviter les erreurs CORS en développement
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
