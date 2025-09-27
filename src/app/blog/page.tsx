import { Metadata } from 'next'
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog'
import Header from '@/components/Header'
import BlogList from '@/components/BlogList'
import BlogSearch from '@/components/BlogSearch'
import BlogCategories from '@/components/BlogCategories'
import BlogTags from '@/components/BlogTags'

export const metadata: Metadata = {
  title: 'Blog & Insights IA | ARCC',
  description: 'Découvrez les dernières insights sur la transformation IA, les histoires de succès en mentoring et les stratégies de croissance business. Analyse experte et conseils pratiques.',
  keywords: [
    'Blog IA',
    'Insights IA',
    'Transformation IA',
    'Croissance business',
    'Mentoring IA',
    'Transformation digitale',
    'Stratégies IA',
    'Consulting IA',
    'ARCC'
  ],
  openGraph: {
    title: 'Blog & Insights IA | ARCC',
    description: 'Découvrez les dernières insights sur la transformation IA, les histoires de succès en mentoring et les stratégies de croissance business.',
    type: 'website',
    url: 'https://ARCC.ca/blog',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Blog ARCC - Insights IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights IA | ARCC',
    description: 'Découvrez les dernières insights sur la transformation IA et la croissance business.',
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
            AI Insights & Knowledge
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the latest insights on AI transformation, mentoring success stories, 
            and proven strategies for business growth. Expert analysis and practical guidance.
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
                  Latest Insights
                </h2>
                <p className="text-gray-600">
                  {posts.length} articles covering AI strategy, implementation, and success stories
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
