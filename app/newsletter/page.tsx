import React from 'react'
import Layout from '@/src/components/layout'
import Link from 'next/link'

export const metadata = {
  title: 'Newsletter - Taimoor Sattar',
  description: 'Subscribe to Taimoor Sattar newsletter for web development articles and course updates.',
}

export default function NewsletterPage() {
  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Stay Updated
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-base mb-8">
          Get notified when new articles, courses, or resources are released.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-teal-600 text-white font-semibold text-sm hover:bg-teal-500 transition-colors no-underline"
        >
          Subscribe via Contact Page
        </Link>
      </div>
    </Layout>
  )
}
