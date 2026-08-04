import React from 'react'
import type { Metadata } from 'next'
import { getPostBySlug, getAllPosts } from '@/src/lib/blogs'
import Layout from '@/src/components/layout'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, BookOpen } from 'lucide-react'
import ShareSocial from '@/src/atom/share-social/index'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found | Taimoor Sattar' }

  const canonicalUrl = `https://taimoorsattar.dev/blogs/${params.slug}`
  const description = post.description || post.excerpt || 'Technical article by Taimoor Sattar'
  const ogImage = 'https://taimoorsattar.dev/profile-pic.jpg'

  return {
    title: `${post.title} - Taimoor Sattar Engineering Blog`,
    description,
    keywords: [
      ...(post.tags || []),
      'Taimoor Sattar',
      'Software Engineering',
      'React Tutorials',
      'Next.js',
      'Sanity CMS',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: `${post.title} | Taimoor Sattar`,
      description,
      publishedTime: post.date,
      authors: ['Taimoor Sattar'],
      siteName: 'Taimoor Sattar',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Taimoor Sattar`,
      description,
      creator: '@taimoorsattar7',
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const tags = Array.isArray(post.tags) ? post.tags : []
  const description = post.description || post.excerpt || 'Technical guide by Taimoor Sattar'

  // Schema.org JSON-LD BlogPosting Structured Data
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: description,
    author: {
      '@type': 'Person',
      name: 'Taimoor Sattar',
      url: 'https://taimoorsattar.dev',
    },
    datePublished: post.date,
    mainEntityOfPage: `https://taimoorsattar.dev/blogs/${params.slug}`,
    publisher: {
      '@type': 'Person',
      name: 'Taimoor Sattar',
      url: 'https://taimoorsattar.dev',
    },
  }

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <header className="space-y-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 no-underline transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Technical Articles
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {formattedDate && (
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {formattedDate}
              </span>
            )}
            {tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
              {post.description}
            </p>
          )}
        </header>

        {/* Article Body Content */}
        <div
          className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-4 prose-headings:font-bold prose-a:text-teal-600 dark:prose-a:text-teal-400"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
        />

        {/* Social Share Bar */}
        <ShareSocial title={post.title} slug={params.slug} />

        <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900/40 space-y-3">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-sm">
              <BookOpen className="w-4 h-4 text-teal-500" /> Taimoor Sattar &bull; Engineering Blog
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you found this technical guide helpful, explore full-stack web development tutorials, Sanity CMS dataset management, and Stripe integration on{' '}
              <Link href="/p/build-standout-website" className="text-teal-600 dark:text-teal-400 font-semibold underline">
                the course page
              </Link>.
            </p>
          </div>
        </footer>
      </article>
    </Layout>
  )
}
