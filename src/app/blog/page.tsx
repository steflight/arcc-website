import { Metadata } from 'next'
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog'
import BlogList from '@/components/BlogList'
import BlogSearch from '@/components/BlogSearch'
import BlogCategories from '@/components/BlogCategories'
import BlogTags from '@/components/BlogTags'

export const metadata: Metadata = {
  title: 'AI Insights & Blog | Kladriva',
  description: 'Discover the latest insights on AI transformation, mentoring success stories, and business growth strategies. Expert analysis and practical guidance.',
  keywords: ['AI insights', 'AI transformation', 'business growth', 'AI mentoring', 'digital transformation'],
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
