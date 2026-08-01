import React from 'react'
import { getAllPosts } from '@/src/lib/blogs'
import BlogClientPage, { PostItem } from '@/src/components/BlogClientPage'

export const metadata = {
  title: 'Technical Blogs & Engineering Guides - Taimoor Sattar',
  description: 'Articles and engineering tutorials on React, Next.js, Sanity CMS, and Web Development.',
}

export default function BlogsPage() {
  const posts = getAllPosts()

  const formattedPosts: PostItem[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description || post.excerpt || '',
    date: post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '',
    tags: Array.isArray(post.tags) ? post.tags : ['Engineering'],
    featuredpost: Boolean(post.featuredpost),
  }))

  return <BlogClientPage initialPosts={formattedPosts} />
}
