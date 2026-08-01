import React from 'react'
import Layout from '@/src/components/layout'
import Bio from '@/src/components/bio/index'
import BlogList from '@/src/components/blog-list/index'
import { getAllPosts } from '@/src/lib/blogs'
import Link from 'next/link'

export const revalidate = 60

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5)

  const formattedPosts = posts.map((post) => ({
    id: post.slug,
    fields: { slug: `/blogs/${post.slug}` },
    frontmatter: {
      title: post.title,
      date: post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
      description: post.description,
      featuredpost: post.featuredpost,
    },
    excerpt: post.excerpt,
  }))

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Bio />

        {/* Spotlight Articles List Section */}
        <div className="mt-8 pt-8">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
            
            {/* Left Column: Articles */}
            <div className="flex flex-col gap-6 lg:max-w-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                  Recent Articles
                </h2>
                <Link
                  href="/blogs"
                  className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline no-underline"
                >
                  All articles &rarr;
                </Link>
              </div>

              <BlogList posts={formattedPosts} />
            </div>

            {/* Right Column: Spotlight Newsletter / Quick Links Box */}
            <div className="lg:pl-16 flex flex-col gap-8">
              
              {/* Simple Newsletter Box */}
              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-700/40 p-6 bg-zinc-50/50 dark:bg-zinc-800/30">
                <h3 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 flex-none stroke-zinc-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <span className="ml-3">Stay up to date</span>
                </h3>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Get notified when I publish new articles or release updates to the course.
                </p>
                <div className="mt-4 flex gap-2">
                  <Link 
                    href="/contact" 
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded-lg hover:opacity-90 transition-opacity no-underline"
                  >
                    Contact & Subscribe
                  </Link>
                </div>
              </div>

              {/* Course Highlight Box */}
              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-700/40 p-6 bg-zinc-50/50 dark:bg-zinc-800/30">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Full-Stack Course
                </h3>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Learn how to build production-ready web applications with React, TypeScript, and modern tools.
                </p>
                <div className="mt-4">
                  <Link 
                    href="/course" 
                    className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline no-underline"
                  >
                    Explore course curriculum &rarr;
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </Layout>
  )
}
