import { Metadata } from 'next'
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog'
import Header from '@/components/Header'
import BlogList from '@/components/BlogList'
import BlogSearch from '@/components/BlogSearch'
import BlogCategories from '@/components/BlogCategories'
import BlogTags from '@/components/BlogTags'

export const metadata: Metadata = {
  title: 'Blog | ARCC - Association des Ressortissants Camerounais au Canada',
  description: 'Découvrez nos articles sur l\'établissement au Canada, le support juridique, le mentorat et les ressources pour la communauté camerounaise. Conseils pratiques et témoignages.',
  keywords: [
    'Blog ARCC',
    'Établissement Canada',
    'Immigration Cameroun',
    'Support juridique',
    'Mentorat',
    'Communauté camerounaise',
    'Ressources Canada',
    'Nouveaux arrivants',
    'ARCC'
  ],
  openGraph: {
    title: 'Blog | ARCC - Association des Ressortissants Camerounais au Canada',
    description: 'Articles et ressources pour la communauté camerounaise au Canada : établissement, support juridique, mentorat et plus.',
    type: 'website',
    url: 'https://camercanada.com/blog',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Blog ARCC - Association des Ressortissants Camerounais au Canada',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | ARCC - Association des Ressortissants Camerounais au Canada',
    description: 'Articles et ressources pour la communauté camerounaise au Canada.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header Navigation */}
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Blog & Ressources ARCC
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos articles sur l'établissement au Canada, le support juridique, le mentorat 
            et les ressources pour la communauté camerounaise. Conseils pratiques et témoignages.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Search */}
              <BlogSearch />
              
              {/* Categories */}
              <BlogCategories categories={categories} />
              
              {/* Tags */}
              <BlogTags tags={tags} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Articles Récents
                </h2>
                <p className="text-gray-600">
                  {posts.length} articles sur l'établissement, le support juridique et les ressources pour la communauté camerounaise
                </p>
              </div>
              
              <BlogList posts={posts} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
