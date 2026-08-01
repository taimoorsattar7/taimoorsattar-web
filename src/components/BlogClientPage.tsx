'use client'

import React, { useState, useMemo } from 'react'
import Layout from '@/src/components/layout'
import Link from 'next/link'
import { Search, Sparkles, Calendar, ArrowRight, BookOpen } from 'lucide-react'

export interface PostItem {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  featuredpost: boolean
}

export default function BlogClientPage({ initialPosts }: { initialPosts: PostItem[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')

  // Find Featured Post
  const featuredPost = useMemo(() => {
    return initialPosts.find(p => p.featuredpost) || initialPosts[0]
  }, [initialPosts])

  // Get unique tag list
  const allTags = useMemo(() => {
    const set = new Set<string>()
    set.add('All')
    initialPosts.forEach(p => p.tags.forEach(t => set.add(t)))
    return Array.from(set).slice(0, 10)
  }, [initialPosts])

  // Filter posts based on search and tag selection
  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag)
      return matchesSearch && matchesTag
    })
  }, [initialPosts, searchQuery, selectedTag])

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Page Header */}
        <header className="space-y-3 max-w-3xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Technical Articles & Engineering Guides
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
            Software Engineering & Jamstack
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            In-depth guides on React, Next.js, Sanity CMS, Stripe Checkout, and modern web architectures.
          </p>
        </header>

        {/* Compact Featured Post Banner */}
        {featuredPost && (
          <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 p-5 sm:p-6 text-left transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                  {featuredPost.date && (
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {featuredPost.date}
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  <Link href={`/blogs/${featuredPost.slug}`} className="no-underline text-zinc-900 dark:text-zinc-100">
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {featuredPost.description}
                </p>
              </div>

              <div className="flex-none">
                <Link
                  href={`/blogs/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs hover:opacity-90 transition-opacity no-underline whitespace-nowrap"
                >
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Filter Controls Bar */}
        <div className="space-y-6 pt-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
              />
            </div>

            {/* Tag Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors focus:outline-none ${
                    selectedTag === tag
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col justify-between p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-sm hover:shadow-md"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
                      {post.date}
                    </span>
                    <div className="flex items-center gap-1">
                      {post.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors leading-snug">
                    <Link href={`/blogs/${post.slug}`} className="no-underline text-zinc-900 dark:text-zinc-100">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:translate-x-1 transition-transform no-underline"
                  >
                    Read Article <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-10 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                No technical articles found matching "{searchQuery}".
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
