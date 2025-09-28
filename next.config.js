/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration conditionnelle pour export statique ou serveur Node.js
  ...(process.env.NODE_ENV === 'production' && process.env.DISABLE_API_ROUTES === 'true' 
    ? {
        // Mode export statique (sans API routes)
        output: 'export',
        trailingSlash: true,
        images: {
          unoptimized: true
        }
      }
    : {
        // Mode serveur Node.js (avec API routes)
        output: 'standalone',
        serverExternalPackages: ['openai'],
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
  ),
}

module.exports = nextConfig
