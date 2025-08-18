import { type BlogPost } from '@/lib/blog'
import BlogListClient from './BlogListClient'

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  return <BlogListClient posts={posts} />
}
