import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  tags: string[]
  featured: boolean
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllBlogPosts(): BlogPost[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Blog directory not found:', postsDirectory)
      return []
    }

    // Get file names under /content/blog
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => {
        try {
          // Remove ".mdx" from file name to get slug
          const slug = fileName.replace(/\.mdx$/, '')

          // Read markdown file as string
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, 'utf8')

          // Use gray-matter to parse the post metadata section
          const matterResult = matter(fileContents)

          // Combine the data with the slug
          return {
            slug,
            title: matterResult.data.title || 'Untitled',
            excerpt: matterResult.data.excerpt || '',
            date: matterResult.data.date || new Date().toISOString(),
            author: matterResult.data.author || 'ARCC Team',
            category: matterResult.data.category || 'General',
            tags: matterResult.data.tags || [],
            featured: matterResult.data.featured || false,
            content: matterResult.content,
          }
        } catch (error) {
          console.error(`Error processing blog post ${fileName}:`, error)
          return null
        }
      })
      .filter(Boolean) as BlogPost[]

    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the slug
    return {
      slug,
      title: matterResult.data.title || 'Untitled',
      excerpt: matterResult.data.excerpt || '',
      date: matterResult.data.date || new Date().toISOString(),
      author: matterResult.data.author || 'ARCC Team',
      category: matterResult.data.category || 'General',
      tags: matterResult.data.tags || [],
      featured: matterResult.data.featured || false,
      content: matterResult.content,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.category === category)
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.featured)
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.tags.includes(tag))
}

export function getAllCategories(): string[] {
  const posts = getAllBlogPosts()
  const categories = posts.map((post) => post.category)
  return [...new Set(categories)]
}

export function getAllTags(): string[] {
  const posts = getAllBlogPosts()
  const tags = posts.flatMap((post) => post.tags)
  return [...new Set(tags)]
}

export function searchBlogPosts(query: string): BlogPost[] {
  const posts = getAllBlogPosts()
  const lowercaseQuery = query.toLowerCase()
  
  return posts.filter((post) => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}
