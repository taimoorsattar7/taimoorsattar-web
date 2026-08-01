import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

const blogsDirectory = path.join(process.cwd(), 'content/blogs')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description?: string
  tags?: string[]
  contentHtml?: string
  featuredpost?: boolean
  excerpt?: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogsDirectory)) {
    return []
  }

  const fileOrDirNames = fs.readdirSync(blogsDirectory)
  const posts: BlogPost[] = []

  fileOrDirNames.forEach((name) => {
    const fullPath = path.join(blogsDirectory, name)
    const stat = fs.statSync(fullPath)
    
    let filePath = ''
    let slug = name

    if (stat.isDirectory()) {
      const indexPath = path.join(fullPath, 'index.md')
      if (fs.existsSync(indexPath)) {
        filePath = indexPath
      }
    } else if (name.endsWith('.md')) {
      filePath = fullPath
      slug = name.replace(/\.md$/, '')
    }

    if (filePath) {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const matterResult = matter(fileContents)

      posts.push({
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date ? new Date(matterResult.data.date).toISOString() : '',
        description: matterResult.data.description || '',
        tags: matterResult.data.tags || [],
        featuredpost: matterResult.data.featuredpost || false,
        excerpt: matterResult.data.description || matterResult.content.slice(0, 160).replace(/[#*`]/g, '') + '...',
      })
    }
  })

  // Sort posts by date descending
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!fs.existsSync(blogsDirectory)) return null

  let filePath = path.join(blogsDirectory, slug, 'index.md')
  if (!fs.existsSync(filePath)) {
    filePath = path.join(blogsDirectory, `${slug}.md`)
  }

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(matterResult.content)

  let contentHtml = processedContent.toString()
  contentHtml = contentHtml
    .replace(/src="\.\/([^"]+)"/g, `src="/blogs/${slug}/$1"`)
    .replace(/src="(?!\/|http|https|data:)([^"]+)"/g, `src="/blogs/${slug}/$1"`)

  return {
    slug,
    title: matterResult.data.title || slug,
    date: matterResult.data.date ? new Date(matterResult.data.date).toISOString() : '',
    description: matterResult.data.description || '',
    tags: matterResult.data.tags || [],
    featuredpost: matterResult.data.featuredpost || false,
    contentHtml,
    excerpt: matterResult.data.description || matterResult.content.slice(0, 160).replace(/[#*`]/g, '') + '...',
  }
}
