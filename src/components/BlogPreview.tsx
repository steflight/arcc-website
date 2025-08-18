import { getFeaturedBlogPosts } from '@/lib/blog'
import BlogPreviewClient from './BlogPreviewClient'

export default function BlogPreview() {
  const featuredPosts = getFeaturedBlogPosts().slice(0, 3)
  
  return <BlogPreviewClient posts={featuredPosts} />
}
